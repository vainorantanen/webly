const router = require('express').Router()
const PortalBid = require('../models/portalbid')
const PortalPost = require('../models/portalpost')

const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    response.json({
      error: 'Access denied'
    })
  } else {
    // jos kyseessä on yritys, niin haetaan kaikki yrityksen tekemät tarjoukset
    if (user.userType !== 'regular') {
      const portalbids = await PortalBid
        .find({ user: user._id.toString()})
        .populate('user', { name: 1 })
      response.json(portalbids)
    } else {
      // muulloin haetaan kaikki tarjoukset, jotka on tehty käyttäjän itsensä
      // tekemiin ilmoituksiin
      // haetaan käyttäjän tekemät portal postaukset
      const listOfUsersPortalPosts = await PortalPost.find({ user: user._id.toString() })
      if (listOfUsersPortalPosts.length === 0) {
        response.json([])
      } else {

        // tehdään lista käyttäjän portaalipostauksien id:istä
        const portalPostIds = listOfUsersPortalPosts.map(post => post._id.toString());
        console.log(portalPostIds)
        // Haetaan ne tarjoukset, joiden id on tässä listassa
        const portalbids = await PortalBid
          .find({ targetPost: { $in: portalPostIds } })
          .populate('user', { name: 1 });
        response.json(portalbids);
      }
    }
}
})

// hakee headerissa olevan käyttäjän portalbidsit
router.get('/usersbids', userExtractor, async (request, response) => {
  const user = request.user;

  if (!user) {
    response.json({
      error: 'Access denied'
    })
  } else {
    const portalbids = await PortalBid
      .find({ user: user._id.toString()})
      .populate('user', { name: 1 })
    response.json(portalbids)
  }
})

/*
router.post('/', userExtractor, async (request, response) => {
  const { description, timeStamp, isApproved, price, target, dueDate } = request.body
  const portalbid = new PortalBid({
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

  portalbid.user = user._id
  portalbid.target = target.id

  let createdportalbid = await portalbid.save()

  user.portalBids = user.portalBids.concat(createdportalbid._id)
  await user.save()

  const targetPost = await PortalPost.findById(target.id)
  targetPost.portalBids = targetPost.portalBids.concat(createdportalbid._id)

  await targetPost.save()

  createdportalbid = await portalbid.findById(createdportalbid._id).populate('user')

  response.status(201).json(createdportalbid)
})
*/
module.exports = router