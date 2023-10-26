const mongoose = require('mongoose')

const schema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetDeveloper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  senderPhone: String,
  relatedFeedBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedBid'
  },
  relatedPortalBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortalBid'
  },
  message: String,
  timeStamp: {
    type: Date,
    required: true
  },
  relatedFeedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedPost'
  },
  relatedPortalPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortalPost'
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('CustomerInfo', schema)