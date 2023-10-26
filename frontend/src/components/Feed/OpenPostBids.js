import React from 'react'
import { Typography, Box } from '@mui/material'
import FeedBidCard from './FeedBidCard'


const OpenPostBids= ({post}) => {

      if (!post) {
        return null
      }

  return (
    <Box>
        {post.feedBids.length > 0 ? post.feedBids.map(offer => (
          <Box key={offer.id}>
            <FeedBidCard post={post} offer={offer}/>
            </Box>
        )) : (
          <Typography sx={{ textAlign: 'center' }}>Ei vielä tarjouksia</Typography>
        )}
      </Box>
  )
}

export default OpenPostBids