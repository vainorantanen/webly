const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

router.post('/', (req, res) => {
  try {
    const { email } = req.body
    User.findOne({ email: email })
      .then(user => {
        if(!user) {
          console.log('No users with that email')
          return res.send({ Status: 'User not existed' })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' })
        const resetLink = process.env.NODE_ENV === 'production' ? `https://webly.onrender.com/reset-password/${user._id}/${token}` :
          `http://localhost:3000/reset-password/${user._id}/${token}`

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
          subject: 'Salasanan alustus linkki',
          text: resetLink
        }

        // eslint-disable-next-line no-unused-vars
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error)
          } else {
            return res.send({ Status: 'Success' })
          }
        })
      })
  }catch (error) {
    res.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router