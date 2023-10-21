const router = require('express').Router()
const FeedPost = require('../models/feedpost')
const FeedBid = require('../models/feedbid')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const feedPosts = await FeedPost
    .find({})
    .populate('user', { name: 1 })
    .populate('feedBids')
  response.json(feedPosts)
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { description, other, question1, question1Other, question2,
      question2Other, question3, question4, date, minPrice, maxPrice } = request.body

    const today = new Date()

    if (date < today) {
      return response.status(400).json({ error: 'date wrong' })
    }

    const feedPost = new FeedPost({
      description,
      timeStamp: today,
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
      feedPost.question1 = question1Other
    }

    if (question2 === 'other') {
      feedPost.question2 = question2Other
    }

    if (question1 === 'other') {
      feedPost.question1 = question1Other
    }

    if (question2 === 'other') {
      feedPost.question2 = question2Other
    }

    const user = request.user

    const checkIfUserDisabled = await isUserDisabled(user)

    // kehittäjät ei voi lisätä näitä avoimia ilmoituksia, devpostit on erikseen
    // tarkistetaan myös käyttäjä tietokannasta, että onko disabloitu
    if (!user || user.userType !== 'regular' || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    feedPost.user = user._id

    let createdFeedPost = await feedPost.save()

    user.feedPosts = user.feedPosts.concat(createdFeedPost._id)
    await user.save()

    createdFeedPost = await FeedPost.findById(createdFeedPost._id).populate('user', { name: 1 })

    response.status(201).json(createdFeedPost)
  } catch(error) {
    response.status(500).json({ error: 'An error occurred' })
  }
})

router.put('/:id', userExtractor, async (request, response) => {
  try {
    const { description, isOpen, question4, other, minPrice, maxPrice } = request.body

    const user = request.user
    // käyttäjän tulee olla sama kuin postauksen lisännyt käyttäjä

    const checkIfUserDisabled = await isUserDisabled(user)

    const feedPost = await FeedPost.findById(request.params.id)

    if (!user || feedPost.user.toString() !== user.id.toString()
    || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    let updatedFeedPost = await FeedPost.findByIdAndUpdate(request.params.id,  { description, isOpen,
      question4, other, minPrice, maxPrice }, { new: true })

    updatedFeedPost = await FeedPost.findById(updatedFeedPost._id).populate('user', { name: 1 }).populate({ path: 'feedBids' })

    response.json(updatedFeedPost)
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' })
  }
})

router.post('/:id/feedbids', userExtractor, async (request, response) => {
  try {
    const { description, minPrice, maxPrice, dueDate } = request.body

    const user = request.user
    const checkIfUserDisabled = await isUserDisabled(user)

    // vain kehittäjät voi tarjota
    if (!user || user.userType === 'regular' || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    const feedPost = await FeedPost.findById(request.params.id)

    if (!feedPost || !feedPost.isOpen) {
      return response.status(400).json({ error: 'feedpost doesnt exist or its closed' })
    }

    const today = new Date()

    if (dueDate < today) {
      return response.status(400).json({ error: 'dueDate cant be in the past' })
    }

    const offerToAdd = new FeedBid({
      description,
      timeStamp: today,
      offeror: user.name,
      targetPost: feedPost._id,
      minPrice,
      maxPrice,
      dueDate
    })

    offerToAdd.user = user._id

    await offerToAdd.save()

    feedPost.feedBids = feedPost.feedBids.concat(offerToAdd._id)
    let updatedfeedPost = await feedPost.save()

    user.feedBids = user.feedBids.concat(offerToAdd._id)
    await user.save()

    updatedfeedPost = await FeedPost.findById(feedPost.id)
      .populate('user', { name: 1 })
      .populate({ path: 'feedBids' })
    response.status(201).json(updatedfeedPost)
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' })
  }

})

router.put('/:id/feedBidAccept/:oid', userExtractor, async (request, response) => {
  try {
    const user = request.user

    const feedPostId = request.params.id
    const offerId = request.params.oid

    const feedPost = await FeedPost.findById(feedPostId)
    const feedBid = await FeedBid.findById(offerId)

    if (!feedPost || !feedPost.isOpen || !feedBid) {
      return response.status(400).json({ error: 'Tapahtui virhe! Postaus tai tarjous on poistettu tai suljettu' })
    }

    const today = new Date()

    if (feedBid.dueDate < today) {
      return response.status(400).json({ error: 'Tapahtui virhe! Tarjous ei ole enää voimassa!' })
    }

    const checkIfUserDisabled = await isUserDisabled(user)

    // vain feedPostin lisännyt käyttäjä voi hyväksyä tarjouksen
    if (!user || feedPost.user.toString() !== user.id.toString()
    || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    // Update the isApproved field of the specified offer
    const updatedOffer = await FeedBid.findByIdAndUpdate(offerId, { isApproved: !feedBid.isApproved }, { new: true })
    // Find the feedPost and update its feedBids array with the updated offer

    const updatedfeedBidsArray = feedPost.feedBids.map(offer =>
      offer._id.equals(updatedOffer._id) ? updatedOffer : offer
    )

    const updatedfeedPost = await FeedPost.findByIdAndUpdate(
      feedPostId,
      { feedBids: updatedfeedBidsArray },
      { new: true }
    ).populate('user', { name: 1 }).populate({ path: 'feedBids' })

    response.json(updatedfeedPost)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const post = await FeedPost.findById(request.params.id)

    const user = request.user

    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || post.user.toString() !== user.id.toString()
    || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    user.feedPosts = user.feedPosts.filter(b => b.toString() !== post.id.toString() )

    await user.save()

    await FeedBid.deleteMany({ targetPost: request.params.id })

    await post.remove()

    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' })
  }
})

router.delete('/:id/feedbids/:oid', userExtractor, async (request, response) => {
  try {
    const feedPost = await FeedPost.findById(request.params.id)
    const user = request.user
    const offerId = request.params.oid

    const offerToDelete = await FeedBid.findById(offerId)

    const checkIfUserDisabled = await isUserDisabled(user)

    if (!user || !(offerToDelete.user.toString() === user._id.toString()
    || user._id.toString() === feedPost.user.toString())
    || checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    await offerToDelete.remove()
    await FeedBid.deleteMany({ id: offerId })

    user.feedBids = user.feedBids.filter(c => c._id.toString() !== offerId)
    await user.save()
    feedPost.feedBids = feedPost.feedBids.filter(c => c._id.toString() !== offerId)
    let updatedfeedPost = await feedPost.save()

    updatedfeedPost = await FeedPost.findById(feedPost.id)
      .populate('user', { name: 1 }).populate({ path: 'feedBids' })
    response.status(201).json(updatedfeedPost)
} catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
}

})

module.exports = router