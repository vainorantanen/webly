const mongoose = require('mongoose')

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description : {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  feedBids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedBid'
    }
  ],
  question1: {
    type: String
  },
  question2: {
    type: String
  },
  question3: {
    type: String
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('FeedPost', schema)
