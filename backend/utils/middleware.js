const jwt = require('jsonwebtoken')

const User = require('../models/user')
const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request)
  next()
}

const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request)

  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    request.user = await User.findById(decodedToken.id)
  }

  next()
}

const isUserDisabled = async (user) => {
  // palautetaan tosi jos käyttäjä ei voi suorittaa operaatiota, muulloi epätosi
  if (!user) {
    console.log('user not passed as parameter')
    return true
  }

  const userFromDb = await User.findById(user.id)

  if (!userFromDb) {
    console.log('user not in db')
    return true
  }

  const disabledState = userFromDb.disabled
  const isEmailConfirmed = userFromDb.emailConfirmed
  // jos käyttäjä on diabloitu tai sähköposti vahvistamatta, niin palautetaan tosi
  // epätosi palautuu vain jos käyttäjä ei ole disabloitu ja sähköposti on vahvistettu
  const returnValue = disabledState === true || isEmailConfirmed === false
  console.log('returning disabled state', returnValue)
  return returnValue
}

const isEmailConfirmed = async (user) => {
  if (!user) {
    console.log('user not passed as parameter')
    return false
  }

  const userFromDb = await User.findById(user.id)

  if (!userFromDb) {
    console.log('user not in db')
    return false
  }

  const isEmailConfirmed = userFromDb.emailConfirmed
  console.log('returning email confirmation state', isEmailConfirmed)
  return isEmailConfirmed
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  isUserDisabled,
  isEmailConfirmed
}
