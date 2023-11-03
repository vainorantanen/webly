const router = require('express').Router()
//const path = require('path')
const { SitemapStream, streamToPromise } = require('sitemap')

router.get('/', async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://webly.onrender.com',
    })

    // Add your URLs to the sitemap
    smStream.write({ url: '/' })
    smStream.write({ url: '/kehittajien-ilmoitukset' })
    smStream.write({ url: '/tarjouskilpailut' })
    smStream.write({ url: '/kehittajille' })
    smStream.write({ url: '/blogit' })
    smStream.write({ url: '/kehittajat' })

    // End the stream
    smStream.end()

    const sitemapXml = await streamToPromise(smStream).then((data) => data.toString())

    res.header('Content-Type', 'application/xml')
    res.send(sitemapXml)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

module.exports = router