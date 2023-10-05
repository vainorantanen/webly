import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import SingleBidCard from './SingleBidCard'

const DevFeedBids = () => {
    const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  const userFeedBids = useSelector(({feedBids}) => feedBids).filter(p => p.user.id === user.id)

  if (!user) {
    return null
  }

  return (
    <Container>
        {userFeedBids.length > 0 ? (userFeedBids.map(bid => (
        <Box key={bid.id}>
            <SingleBidCard offer={bid}/>
        </Box>
      ))): (
        <Typography>Ei vielä tarjouksia</Typography>
      )}
    </Container>
  )
}

export default DevFeedBids