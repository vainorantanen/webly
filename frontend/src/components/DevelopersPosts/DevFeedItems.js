import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import DevFeedPostCard from './DevFeedPostCard'

const DevFeedItems = ({ devFeedPosts }) => {

  if (devFeedPosts.length === 0) {
    return (
    <Typography>Ei ilmoituksia</Typography>
    )
  }

  return (
    <Box sx={{ marginTop: '4rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '@media (min-width: 600px)': {
            flexDirection: 'row',
            alignItems: 'flex-start',
          },
        }}>
            {devFeedPosts.map((post) => (
              <DevFeedPostCard key={post.id} post={post} />
            ))}
          </Box>
        </Box>
  )
}

export default DevFeedItems
