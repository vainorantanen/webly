const router = require('express').Router()
const DevFeedPost = require('../models/devfeedpost')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const devfeedPosts = await DevFeedPost
    .find({})
    .populate('user', { name: 1 })
  response.json(devfeedPosts)
})

router.post('/', userExtractor, async (request, response) => {
  const { description, title, price, postType, time, location } = request.body
  const devfeedPost = new DevFeedPost({
    description,
    timeStamp: new Date(),
    title,
    price,
    postType,
    time,
    location
  })

  const user = request.user
  const checkIfUserDisabled = await isUserDisabled(user)

  // vain kehittäjät voi lisätä devposteja eli regularit ei voi
  if (!user || user.userType === 'regular' || checkIfUserDisabled === true) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  devfeedPost.user = user._id

  let createdFeedPost = await devfeedPost.save()

  user.devfeedPosts = user.devfeedPosts.concat(createdFeedPost._id)
  await user.save()

  createdFeedPost = await DevFeedPost.findById(createdFeedPost._id)

  response.status(201).json(createdFeedPost)
})
/*
router.put('/:id', async (request, response) => {
  const { description, isOpen } = request.body

  let updatedFeedPost = await FeedPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user')

  response.json(updatedFeedPost)
})
*/
/*
router.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.remove()

  response.status(204).end()
})
*/
module.exports = router