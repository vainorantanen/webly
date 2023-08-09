import { Container } from '@mui/material'
import React from 'react'
import FeedHeader from './FeedHeader'
import FeedItems from './FeedItems'

const Feed = ({ feedPosts }) => {

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem',
      marginBottom: '1rem' }}>
      <FeedHeader />
      <FeedItems feedPosts={feedPosts} />
    </Container>
  )
}

export default Feed