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
  try {
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

    // Handle your authorization checks
    if (!user || user.userType === 'regular' || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    devfeedPost.user = user._id

    let createdFeedPost = await devfeedPost.save()

    user.devfeedPosts = user.devfeedPosts.concat(createdFeedPost._id)
    await user.save()

    createdFeedPost = await DevFeedPost.findById(createdFeedPost._id).populate('user', { name: 1 })

    response.status(201).json(createdFeedPost)
  } catch (error) {
    // Handle the error gracefully and send an appropriate response
    response.status(500).json({ error: 'An error occurred' });
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, title, price, time, location } = request.body

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    // Handle your authorization checks
    if (!user || user.userType === 'regular' || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedFeedPost = await DevFeedPost.findByIdAndUpdate(
      request.params.id,
      { description, title, price, time, location },
      { new: true }
    )

    updatedFeedPost = await DevFeedPost.findById(updatedFeedPost._id).populate('user', { name: 1 })

    response.json(updatedFeedPost)
  } catch (error) {
    // Handle the error gracefully and send an appropriate response
    response.status(500).json({ error: 'An error occurred' });
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    // Handle your authorization checks
    if (!user || user.userType === 'regular' || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    const devfeedPost = await DevFeedPost.findById(request.params.id)

    user.devfeedPosts = user.devfeedPosts.filter(b => b.toString() !== devfeedPost.id.toString() )

    await user.save()
    await devfeedPost.remove()

    response.status(204).end()
  } catch (error) {
    // Handle the error gracefully and send an appropriate response
    response.status(500).json({ error: 'An error occurred' });
  }
})

module.exports = router