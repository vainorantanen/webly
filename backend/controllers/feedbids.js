const router = require('express').Router()
const FeedBid = require('../models/feedbid')

router.get('/', async (request, response) => {
  const feedBids = await FeedBid
    .find({})
    .populate('user', { name: 1 })
  response.json(feedBids)
})

module.exports = router