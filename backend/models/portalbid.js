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
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  targetPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PortalPost'
  },
  offeror: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PortalBid', schema)
