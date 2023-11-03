const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')
const path = require('path')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const feedPostsRouter = require('./controllers/feedposts')
const feedBidsRouter = require('./controllers/feedbids')
const devfeedPostsRouter = require('./controllers/devfeedposts')
const portalPostRouter = require('./controllers/portalposts')
const blogsRouter = require('./controllers/blogs')
const ratingsRouter = require('./controllers/ratings')
const portalBidsRouter = require('./controllers/portalbids')
const customerInfoRouter = require('./controllers/customerinfo')
const forgotPasswordRouter = require('./controllers/forgotpassword')
const resetPassWordRouter = require('./controllers/resetpassword')
const confirmEmailRouter = require('./controllers/confirmemail')
const sitemapRouter = require('./controllers/sitemap')

const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/feedposts', feedPostsRouter)
app.use('/api/feedbids', feedBidsRouter)
app.use('/api/devfeedposts', devfeedPostsRouter)
app.use('/api/portalposts', portalPostRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/ratings', ratingsRouter)
app.use('/api/portalbids', portalBidsRouter)
app.use('/api/customerinfo', customerInfoRouter)
app.use('/api/forgot-password', forgotPasswordRouter)
app.use('/api/reset-password', resetPassWordRouter)
app.use('/api/confirm-email', confirmEmailRouter)
app.use('/sitemap.xml', sitemapRouter)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app