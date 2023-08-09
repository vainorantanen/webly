const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

router.post('/', async (request, response) => {
  const { username, name, password, description, isCompany } = request.body

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
    passwordHash,
    description,
    isCompany
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('feedPosts', { description: 1, timeStamp: 1 })
    .populate('feedBids', { price: 1, description: 1 })
  response.json(users)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { description } = request.body

  console.log('desc: ', description)
  console.log('user: ', request.user)

  let updatedUser = await User.findByIdAndUpdate(request.params.id,  { description }, { new: true })

  console.log('updatedUser: ', updatedUser)

  updatedUser = await User.findById(updatedUser._id)

  response.json(updatedUser)
})

module.exports = router