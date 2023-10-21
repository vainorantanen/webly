const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'Väärä käyttäjätunnus tai salasana'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name,
        userType: user.userType, description : user.description,
        feedBids: user.feedBids, feedPosts: user.feedPosts, id: user.id,
        email: user.email, disabled: user.disabled
      })
  } catch (error) {
    response.status(500).json({ error: 'Tapahtui virhe palvelimella' })
  }
})

module.exports = loginRouter