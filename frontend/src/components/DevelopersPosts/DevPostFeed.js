import React from 'react'
import { Container } from '@mui/material'
import DevFeedHeader from './DevFeedHeader'
import DevFeedItems from './DevFeedItems'

const DevPostFeed = ({ devFeedPosts }) => {
  return (
    <Container sx={{ marginTop: '5rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem',
    marginBottom: '1rem' }}>
    <DevFeedHeader />
    <DevFeedItems devFeedPosts={devFeedPosts} />
  </Container>
  )
}

export default DevPostFeed