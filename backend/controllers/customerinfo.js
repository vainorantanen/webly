const router = require('express').Router()
const CustomerInfo = require('../models/customerinfo')
const FeedBid = require('../models/feedbid')
const PortalBid = require('../models/portalbid')

const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    response.json([])
  } else if (user.username === 'admin') {
    const customerinfo = await CustomerInfo
      .find({})
    response.json(customerinfo)
  } else if (user.userType === 'regular') {
    // normi käyttäjä voi hakea ne yhteydenotot, jotka hän itse on lähettänyt
    const customerinfo = await CustomerInfo
      .find({sender: user._id.toString()})
    response.json(customerinfo)
  } else if (user.userType !== 'regular') {
    // yrityskäyttäjät voi hakea ne, jotka on kohdistettu heille
    const customerinfo = await CustomerInfo
      .find({targetDeveloper: user._id.toString()})
    response.json(customerinfo)
  } else {
    response.json([])
  }
})

router.post('/', userExtractor, async (request, response) => {

  const { senderEmail, senderPhone, offer, message } = request.body

  const user = request.user

  if (!user || !offer) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const customerinfo = new CustomerInfo({
    targetDeveloper: offer.user.id,
    senderEmail,
    senderPhone,
    message
  })

  if (offer.isPortalBid === true) {
    const portalOfferFromdb = await PortalBid.findById(offer.id)
    if (!portalOfferFromdb) {
      return response.status(400).json({ error: 'could not find offer' })
    } else {
      customerinfo.relatedPortalBid = portalOfferFromdb._id
    }
  } else if (offer.isPortalBid === false) {
    const feedOfferFromdb = await FeedBid.findById(offer.id)
    if (!feedOfferFromdb) {
      return response.status(400).json({ error: 'could not find offer' })
    } else {
      customerinfo.relatedFeedBid = feedOfferFromdb._id
    }
  } else {
    return response.status(400).json({ error: 'could not find offer' })
  }

  customerinfo.sender = user._id

  let createdcustomerinfo = await customerinfo.save()

  createdcustomerinfo = await CustomerInfo.findById(createdcustomerinfo._id)

  response.status(201).json(createdcustomerinfo)
})

module.exports = router