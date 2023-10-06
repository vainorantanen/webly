const router = require('express').Router()
const PortalBid = require('../models/portalbid')
const PortalPost = require('../models/portalpost')

const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user;

  if (!user) {
    response.json([])
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
        const portalPostIds = listOfUsersPortalPosts.map(post => post._id.toString())
        // Haetaan ne tarjoukset, joiden id on tässä listassa
        const portalbids = await PortalBid
          .find({ targetPost: { $in: portalPostIds } })
          .populate('user', { name: 1 });
        response.json(portalbids);
      }
    }
}
})

router.post('/', userExtractor, async (request, response) => {
  const { description, price, target, dueDate } = request.body
  const user = request.user
  const portalbid = new PortalBid({
    description,
    timeStamp: new Date(),
    isApproved: false,
    offeror: user.name,
    price,
    dueDate
  })

  // normikäyttäjät ei voi tarjota
  if (!user || user.userType === 'regular') {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const targetPost = await PortalPost.findById(target.id)
  portalbid.user = user._id
  portalbid.targetPost = target.id

  let createdportalbid = await portalbid.save()

  user.portalBids = user.portalBids.concat(createdportalbid._id)
  await user.save()

  targetPost.portalBids = targetPost.portalBids.concat(createdportalbid._id)

  await targetPost.save()

  createdportalbid = await PortalBid.findById(createdportalbid._id).populate('user')

  response.status(201).json(createdportalbid)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const portalBid = await PortalBid.findById(request.params.id)
  const portalPost = await PortalPost.findById(portalBid.targetPost)

  const user = request.user


  // sekä lisännyt käyttäjä että postauksen omistaja voi poistaa
  if (!user || !(portalBid.user.toString() === user.id.toString() || user.id.toString() === portalPost.user.toString())) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.portalBids = user.portalBids.filter(b => b.toString() !== portalBid.id.toString() )
  portalPost.portalBids = portalPost.portalBids.filter(b => b.toString() !== portalBid.id.toString() )

  await user.save()
  await portalPost.save()
  await portalBid.remove()

  response.status(204).end()
})

router.put('/:id/acceptBid', userExtractor, async (request, response) => {
  const user = request.user

  const portalBid = await PortalBid.findById(request.params.id)
  const portalPost = await PortalPost.findById(portalBid.targetPost)

  // vain portalPostin lisännyt käyttäjä voi hyväksyä tarjouksen
  if (!user || !portalBid || !portalPost || portalPost.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }
  
  let updatedportalBid = await PortalBid.findByIdAndUpdate(request.params.id,  { isApproved: !portalBid.isApproved }, { new: true })

  updatedportalBid = await PortalBid.findById(updatedportalBid._id).populate('user')

  response.json(updatedportalBid)
})

module.exports = router