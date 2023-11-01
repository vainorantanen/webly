const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

router.post('/:id/:token', (req, res) => {
  const { id, token } = req.params
  // eslint-disable-next-line no-unused-vars
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) {
      return res.json({ Status: 'Error with token' })
    } else {
      User.findByIdAndUpdate({ _id: id }, { emailConfirmed: true })
      // eslint-disable-next-line no-unused-vars
        .then(u => res.send({ Status: 'Success' }))
        .catch(err => res.send({ Status: err }))
    }
  })
})

router.post('/', async (request, response) => {
  try {
    const { email } = request.body
    const user = await User.findOne({ email: email })
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
        return response.send({ Status: 'Success' })
      }
    })

  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router