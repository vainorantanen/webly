const router = require('express').Router()
const PortalPost = require('../models/portalpost')
const FeedBid = require('../models/feedbid')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const portalPosts = await PortalPost
    .find({})
    .populate('user', { name: 1 })
    .populate('feedBids')
  response.json(portalPosts)
})

router.post('/', userExtractor, async (request, response) => {
  const { description, other, question1, question1Other, question2, question2Other, question3, question4, date, minPrice, maxPrice } = request.body
  console.log('request.body', request.body)

  const portalPost = new PortalPost({
    description,
    timeStamp: new Date(),
    isOpen: true,
    question1,
    question2,
    question3,
    question4,
    dueDate: date,
    other,
    minPrice,
    maxPrice
  })

  if (question1 === 'other') {
    portalPost.question1 = question1Other
  }

  if (question2 === 'other') {
    portalPost.question2 = question2Other
  }

  if (question1 === 'other') {
    portalPost.question1 = question1Other
  }

  if (question2 === 'other') {
    portalPost.question2 = question2Other
  }

  const user = request.user

  // myös portaalissa vain normikäyttäjät voi luoda postauksen
  if (!user || !(user.userType === 'regular')) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  portalPost.user = user._id

  let createdportalPost = await portalPost.save()

  user.portalPosts = user.portalPosts.concat(createdportalPost._id)
  await user.save()

  createdportalPost = await PortalPost.findById(createdportalPost._id).populate('user')

  response.status(201).json(createdportalPost)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { description, isOpen } = request.body

  const user = request.user
  // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

  const portalPost = await PortalPost.findById(request.params.id)


  if (!user || portalPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  let updatedportalPost = await PortalPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedportalPost = await PortalPost.findById(updatedportalPost._id).populate('user').populate({ path: 'feedBids' })

  response.json(updatedportalPost)
})

router.post('/:id/feedbids', userExtractor, async (request, response) => {
  const { description, price } = request.body

  const user = request.user

  // myös portaalissa vain kehittäjät voi tarjota
  if (!user || user.userType === 'regular') {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const portalPost = await PortalPost.findById(request.params.id)

  const offerToAdd = new FeedBid({
    description,
    timeStamp: new Date(),
    isApproved: false,
    offeror: user.name,
    targetPost: portalPost._id,
    price,
  })

  offerToAdd.user = user._id

  await offerToAdd.save()

  portalPost.feedBids = portalPost.feedBids.concat(offerToAdd._id)
  let updatedportalPost = await portalPost.save()

  user.feedBids = user.feedBids.concat(offerToAdd._id)
  await user.save()

  updatedportalPost = await PortalPost.findById(portalPost.id).populate('user').populate({ path: 'feedBids' })
  response.status(201).json(updatedportalPost)

})

router.put('/:id/feedBidAccept/:oid', userExtractor, async (request, response) => {

  const user = request.user

  const portalPostId = request.params.id
  const offerId = request.params.oid

  const portalPost = await PortalPost.findById(portalPostId)

  // vain portalPostin lisännyt käyttäjä voi hyväksyä tarjouksen
  if (!user || portalPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  // Update the isApproved field of the specified offer
  const updatedOffer = await FeedBid.findByIdAndUpdate(offerId, { isApproved: true }, { new: true })
  // Find the portalPost and update its feedBids array with the updated offer

  const updatedfeedBidsArray = portalPost.feedBids.map(offer =>
    offer._id.equals(updatedOffer._id) ? updatedOffer : offer
  )

  const updatedportalPost = await PortalPost.findByIdAndUpdate(
    portalPostId,
    { feedBids: updatedfeedBidsArray },
    { new: true }
  ).populate('user').populate({ path: 'feedBids' })

  response.json(updatedportalPost)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const post = await PortalPost.findById(request.params.id)

  const user = request.user

  if (!user || post.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.portalPosts = user.portalPosts.filter(b => b.toString() !== post.id.toString() )

  await user.save()

  await FeedBid.deleteMany({ targetPost: request.params.id })

  await post.remove()

  response.status(204).end()
})

router.delete('/:id/feedbids/:oid', userExtractor, async (request, response) => {
  const portalPost = await PortalPost.findById(request.params.id)
  const user = request.user
  const offerId = request.params.oid

  const offerToDelete = await FeedBid.findById(offerId)

  if (!user || !(offerToDelete.user.toString() === user._id.toString() || user._id.toString() === portalPost.user.toString())) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  await offerToDelete.remove()

  user.feedBids = user.feedBids.filter(c => c._id.toString() !== offerId)
  await user.save()
  portalPost.feedBids = portalPost.feedBids.filter(c => c._id.toString() !== offerId)
  let updatedportalPost = await portalPost.save()

  updatedportalPost = await PortalPost.findById(portalPost.id).populate('user').populate({ path: 'feedBids' })
  response.status(201).json(updatedportalPost)

})

module.exports = router