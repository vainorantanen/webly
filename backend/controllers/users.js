const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

router.post('/', async (request, response) => {
  try {
    const { username, name, password, description, userType, email } = request.body

    if ( !password || password.length < 3) {
      return response.status(400).json({
        error: '`Salasana` on liian lyhyt (pitää olla yli 3 merkkiä pitkä)'
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

    // sähköpostin vahvistaminen
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' })
    const confirmLink = process.env.NODE_ENV === 'production' ? `https://webly.fi/confirm-email/${user._id}/${token}` :
      `http://localhost:3000/confirm-email/${user._id}/${token}`

    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: true,
      auth: {
        user: process.env.SENDING_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    var mailOptions = {
      from: process.env.SENDING_EMAIL,
      to: email,
      subject: 'Sähköpostin vahvistus linkki',
      text: confirmLink
    }

    // eslint-disable-next-line no-unused-vars
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
      } else {
        // kaikki hyvin
      }
    })

    response.status(201).json(savedUser)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.get('/', userExtractor, async (request, response) => {
  const user = request.user
  let users

  if (!user) {
    // Show only users with userType !== 'regular'
    users = await User.find({ userType: { $ne: 'regular' } })
      .populate({ path: 'feedBids' })
  } else if (user.username === 'admin') {
    // Find all users
    users = await User.find({})
      .populate({ path: 'feedPosts' })
      .populate({ path: 'feedBids' })
  } else if (user.userType === 'regular') {
    // Find the user himself and all users with userType !== 'regular'
    users = await User.find({ $or: [{ _id: user._id }, { userType: { $ne: 'regular' } }] })
      .populate({ path: 'feedPosts' })
      .populate({ path: 'feedBids' })
  } else if (user.userType !== 'regular') {
    // Show only users with userType !== 'regular'
    users = await User.find({ userType: { $ne: 'regular' } })
      .populate({ path: 'feedBids' })
  } else {
    users = []
  }

  response.json(users)
})


router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, email } = request.body

    const user = request.user

    const wantedUser = await User.findById(request.params.id)

    if (!user || wantedUser.id.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedUser = await User.findByIdAndUpdate(request.params.id,  { description, email }, { new: true })

    updatedUser = await User.findById(updatedUser._id)

    response.json(updatedUser)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.put('/:id/disable', userExtractor, async (request, response) => {
  try {
    const { disabled } = request.body

    const user = request.user

    const userFromDb = await User.findById(request.params.id)

    // haetaan käyttäjä tietokannasta ja tarkistetaan pari juttua
    if (!userFromDb || disabled !== userFromDb.disabled || userFromDb.username === 'admin') {
      return response.status(400).json({ error : 'user not found or disabled state not matching' })
    }

    // vain admin voi muuttaa disabled/enabled tilaa
    if (!user || user.username !== 'admin') {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedUser = await User.findByIdAndUpdate(request.params.id,  { disabled: !disabled }, { new: true })

    updatedUser = await User.findById(updatedUser._id)

    response.json(updatedUser)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router