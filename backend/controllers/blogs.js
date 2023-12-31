const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { name: 1 })
  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { description, title } = request.body
    const blog = new Blog({
      description,
      timeStamp: new Date(),
      title,
    })

    const user = request.user

    const checkIfUserDisabled = await isUserDisabled(user)

    // vain kehittäjät voi lisätä blogeja, eli regular tyypit ei voi lisätä
    if (!user || user.userType === 'regular' || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    blog.user = user._id

    let createdblog = await blog.save()

    user.blogs = user.blogs.concat(createdblog._id)
    await user.save()

    createdblog = await Blog.findById(createdblog._id).populate('user', { name: 1 })

    response.status(201).json(createdblog)
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, title } = request.body

    const user = request.user

    const blog = await Blog.findById(request.params.id)

    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || blog.user.toString() !== user.id.toString() || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedblog = await Blog.findByIdAndUpdate(request.params.id,  { description, title }, { new: true })

    updatedblog = await Blog.findById(updatedblog._id).populate('user', { name: 1 })

    response.json(updatedblog)
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if (!user || blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

    await user.save()
    await blog.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' })
  }
})

module.exports = router