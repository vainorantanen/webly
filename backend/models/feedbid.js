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
  isApproved: {
    type: Boolean,
    default: false
  },
  minPrice: {
    type: Number,
    required: true
  },
  maxPrice: {
    type: Number,
    required: true
  },
  targetPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedPost'
  },
  offeror: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  isPortalBid: {
    type: Boolean,
    default: false
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('FeedBid', schema)
