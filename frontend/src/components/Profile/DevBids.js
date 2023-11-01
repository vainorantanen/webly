import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import SingleBidCard from './SingleBidCard'
import { Link } from 'react-router-dom'

const DevBids = () => {
    const user = useSelector(({user}) => user)

  const userFeedBids = useSelector(({feedBids}) => feedBids).filter(p => p.user.id === user.id)
  const devPortalBids = useSelector(({portalBids}) => portalBids)

  if (!user) {
    return null
  }

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography sx={{ fontSize: '1.1rem', borderBottom: '1px solid black' }}>Avoimiin ilmoituksiin tehdyt tarjoukset</Typography>
        {userFeedBids && userFeedBids.length > 0 ? (userFeedBids.map(bid => (
        <Box key={bid.id}>
            <SingleBidCard offer={bid}/>
            <Button component={Link} to={`/tarjouskilpailut/${bid.targetPost}`}>Siirry ilmoitukseen</Button>
        </Box>
      ))): (
        <Typography>Ei vielä tarjouksia</Typography>
      )}
    <Typography sx={{ fontSize: '1.1rem', borderBottom: '1px solid black',
  marginTop: '1rem' }}>Portaali-ilmoituksiin tehdyt tarjoukset</Typography>
        {devPortalBids && devPortalBids.length > 0 ? (devPortalBids.map(
          bid => (
            <Box key={bid.id}>
              <SingleBidCard offer={bid}/>
              <Button component={Link} to={`/portaali/ilmoitukset/${bid.targetPost}`}>Siirry ilmoitukseen</Button>
            </Box>
          )
        )): (
          <Typography>Ei vielä tarjouksia</Typography>
        )}

    </Box>
  )
}

export default DevBids