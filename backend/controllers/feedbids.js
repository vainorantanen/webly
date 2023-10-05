const router = require('express').Router()
const FeedBid = require('../models/feedbid')
const FeedPost = require('../models/feedpost')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const feedBids = await FeedBid
    .find({})
    .populate('user', { name: 1 })
  response.json(feedBids)
})

router.post('/', userExtractor, async (request, response) => {
  const { description, timeStamp, isApproved, price, target, dueDate } = request.body
  console.log(dueDate)
  const feedBid = new FeedBid({
    description,
    timeStamp,
    isApproved,
    price,
    dueDate
  })

  const user = request.user

  // normikäyttäjät ei voi tarjota
  if (!user || user.userType === 'regular') {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  feedBid.user = user._id
  feedBid.target = target.id

  let createdFeedBid = await feedBid.save()

  user.feedBids = user.feedBids.concat(createdFeedBid._id)
  await user.save()

  const targetPost = await FeedPost.findById(target.id)
  targetPost.feedBids = targetPost.feedBids.concat(createdFeedBid._id)

  await targetPost.save()

  createdFeedBid = await FeedBid.findById(createdFeedBid._id).populate('user')

  response.status(201).json(createdFeedBid)
})

router.put('/:id', async (request, response) => {
  const { likes, description } = request.body

  let updatedFeedBid = await FeedBid.findByIdAndUpdate(request.params.id,  { likes, description }, { new: true })

  updatedFeedBid = await FeedBid.findById(updatedFeedBid._id).populate('user')

  response.json(updatedFeedBid)
})

module.exports = router