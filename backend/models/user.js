const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  userType: {
    type: String,
    enum: ['regular', 'company', 'freelancer', 'otherDev'],
    default: 'regular',
    required: true
  },
  feedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedPost'
    }
  ],
  feedBids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedBid'
    }
  ],
  devfeedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DevFeedPost'
    }
  ],
  portalPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PortalPost'
    }
  ],
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
  disabled: {
    type: Boolean,
    default: false
  },
  givenRatings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
