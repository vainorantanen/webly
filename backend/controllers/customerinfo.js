const router = require('express').Router()
const CustomerInfo = require('../models/customerinfo')
const FeedBid = require('../models/feedbid')
const PortalBid = require('../models/portalbid')

const { userExtractor, isUserDisabled } = require('../utils/middleware')

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
      .find({ sender: user._id.toString() })
    response.json(customerinfo)
  } else if (user.userType !== 'regular') {
    // yrityskäyttäjät voi hakea ne, jotka on kohdistettu heille
    const customerinfo = await CustomerInfo
      .find({ targetDeveloper: user._id.toString() })
    response.json(customerinfo)
  } else {
    response.json([])
  }
})

router.post('/', userExtractor, async (request, response) => {
  try {
    const { senderEmail, senderPhone, offer, message } = request.body

    const user = request.user

    if (!user || !offer) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }

    const checkIfUserDisabled = await isUserDisabled(user)

    if (checkIfUserDisabled === true) {
      return response.status(401).json({ error: 'Tapahtui virhe! Käyttäjäsi on disabloitu!' })
    }

    const customerinfo = new CustomerInfo({
      senderEmail,
      senderPhone,
      message,
      timeStamp: new Date()
    })

    if (offer.isPortalBid === true) {
      const portalOfferFromdb = await PortalBid.findById(offer.id)
      if (!portalOfferFromdb) {
        return response.status(400).json({ error: 'Tarjousta ei ole enää olemassa, se on todennäköisesti poistettu' })
      } else {
        customerinfo.relatedPortalBid = portalOfferFromdb._id
        customerinfo.targetDeveloper = portalOfferFromdb.user
        customerinfo.relatedPortalPost = portalOfferFromdb.targetPost
      }
    } else if (offer.isPortalBid === false) {
      const feedOfferFromdb = await FeedBid.findById(offer.id)
      if (!feedOfferFromdb) {
        return response.status(400).json({ error: 'Tarjousta ei ole enää olemassa, se on todennäköisesti poistettu' })
      } else {
        customerinfo.relatedFeedBid = feedOfferFromdb._id
        customerinfo.targetDeveloper = feedOfferFromdb.user
        customerinfo.relatedFeedPost = feedOfferFromdb.targetPost
      }
    } else {
      return response.status(400).json({ error: 'Tarjousta ei ole enää olemassa, se on todennäköisesti poistettu' })
    }

    customerinfo.sender = user._id

    let createdcustomerinfo = await customerinfo.save()

    createdcustomerinfo = await CustomerInfo.findById(createdcustomerinfo._id)

    response.status(201).json(createdcustomerinfo)
  } catch (error) {
    response.status(500).json({ error: 'Palvelimella tapahtui virhe, yritä myöhemmin uudelleen' })
  }
})

module.exports = router