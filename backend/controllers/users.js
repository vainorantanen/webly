const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.post('/', async (request, response) => {
  const { username, name, password, description, userType, email } = request.body

  if ( !password || password.length < 3) {
    return response.status(400).json({
      error: '`password` is shorter than the minimum allowed length (3)'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    email,
    passwordHash,
    description,
    userType
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
  const users = await User.find({})
    .populate({ path: 'feedPosts' })
    .populate( { path: 'feedBids' })
  response.json(users)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { description, email } = request.body

  const user = request.user

  const wantedUser = await User.findById(request.params.id)

  if (!user || wantedUser.id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedUser = await User.findByIdAndUpdate(request.params.id,  { description, email }, { new: true })

  updatedUser = await User.findById(updatedUser._id)

  response.json(updatedUser)
})

module.exports = router