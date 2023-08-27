const router = require('express').Router()
const FeedPost = require('../models/feedpost')
const FeedBid = require('../models/feedbid')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const feedPosts = await FeedPost
    .find({})
    .populate('user', { name: 1 })
    .populate('feedBids')
  response.json(feedPosts)
})

router.post('/', userExtractor, async (request, response) => {
  //console.log("RBODY", request.body)
  const { description, other, question1, question1Other, question2, question2Other, question3, question4, dueDate } = request.body
  //console.log("aINFO", additionalinfo)

  const feedPost = new FeedPost({
    description,
    timeStamp: new Date(),
    isOpen: true,
    question1,
    question2,
    question3,
    question4,
    dueDate,
    other
  })

  if (question1 === 'other') {
    feedPost.question1 = question1Other
  }

  if (question2 === 'other') {
    feedPost.question2 = question2Other
  }

  const user = request.user

  if (!user || user.isCompany === true) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  feedPost.user = user._id

  let createdFeedPost = await feedPost.save()

  user.feedPosts = user.feedPosts.concat(createdFeedPost._id)
  await user.save()

  createdFeedPost = await FeedPost.findById(createdFeedPost._id).populate('user')

  response.status(201).json(createdFeedPost)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { description, isOpen } = request.body

  const user = request.user
  // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

  const feedPost = await FeedPost.findById(request.params.id)


  if (!user || feedPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedFeedPost = await FeedPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user').populate({ path: 'feedBids' })

  response.json(updatedFeedPost)
})

router.post('/:id/feedbids', userExtractor, async (request, response) => {
  const { description, price } = request.body

  const user = request.user

  if (!user || user.isCompany === false) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const feedPost = await FeedPost.findById(request.params.id)

  const offerToAdd = new FeedBid({
    description,
    timeStamp: new Date(),
    isApproved: false,
    offeror: user.name,
    targetPost: feedPost._id,
    price,
  })

  offerToAdd.user = user._id

  await offerToAdd.save()

  feedPost.feedBids = feedPost.feedBids.concat(offerToAdd._id)
  let updatedfeedPost = await feedPost.save()

  user.feedBids = user.feedBids.concat(offerToAdd._id)
  await user.save()

  updatedfeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'feedBids' })
  response.status(201).json(updatedfeedPost)

})

router.put('/:id/feedBidAccept/:oid', userExtractor, async (request, response) => {

  const user = request.user

  const feedPostId = request.params.id
  const offerId = request.params.oid

  const feedPost = await FeedPost.findById(feedPostId)

  // vain feedPostin lisännyt käyttäjä voi hyväksyä tarjouksen
  if (!user || feedPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  // Update the isApproved field of the specified offer
  const updatedOffer = await FeedBid.findByIdAndUpdate(offerId, { isApproved: true }, { new: true })
  // Find the feedPost and update its feedBids array with the updated offer

  const updatedfeedBidsArray = feedPost.feedBids.map(offer =>
    offer._id.equals(updatedOffer._id) ? updatedOffer : offer
  )

  const updatedfeedPost = await FeedPost.findByIdAndUpdate(
    feedPostId,
    { feedBids: updatedfeedBidsArray },
    { new: true }
  ).populate('user').populate({ path: 'feedBids' })

  response.json(updatedfeedPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await FeedPost.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.feedPosts = user.feedPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()

  await FeedBid.deleteMany({ targetPost: request.params.id })

  await post.remove()

  response.status(204).end()
})

router.delete('/:id/feedbids/:oid', userExtractor, async (request, response) => {
  const feedPost = await FeedPost.findById(request.params.id)
  const user = request.user
  const offerId = request.params.oid

  const offerToDelete = await FeedBid.findById(offerId)

  if (!user || !(offerToDelete.user.toString() === user._id.toString() || user._id.toString() === feedPost.user.toString())) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  await offerToDelete.remove()
  await FeedBid.deleteMany({ id: offerId })

  user.feedBids = user.feedBids.filter(c => c._id.toString() !== offerId)
  await user.save()
  feedPost.feedBids = feedPost.feedBids.filter(c => c._id.toString() !== offerId)
  let updatedfeedPost = await feedPost.save()

  updatedfeedPost = await FeedPost.findById(feedPost.id).populate('user').populate({ path: 'feedBids' })
  response.status(201).json(updatedfeedPost)

})

module.exports = router