import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const FeedBidCard = ({ bid }) => {
  //console.log('biddi: ', bid)
  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
      {bid.isApproved ? (
        <Box>
          <Typography>Hyväksytty ilmoittajan toimesta</Typography>
          <CheckCircleIcon />
        </Box>
      ) : (
        <Typography>Avoinna oleva tarjous</Typography>
      )}
      <Typography>Hinta: {bid.price} euroa</Typography>
      <Typography>Tarjous jätetty: {bid.timeStamp.split('T')[0]}</Typography>
      <Typography>{bid.description}</Typography>
    </Box>
  )
}

export default FeedBidCard