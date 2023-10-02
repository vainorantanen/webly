import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import { useSelector } from 'react-redux'
import SingleFeedPostInfo from './SingleFeedPostInfo'
import OpenPostBidCard from './OpenPostBidCard'


const SingleFeedPost = () => {

  

  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const post = useSelector(({feedPosts}) => feedPosts.find(p => p.id === id))

  

  return (
    <Container  sx={{ marginTop: '7rem', minHeight: '100vh' }}>
      <SingleFeedPostInfo post={post}/>
      {user && user.userType !== 'regular' && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeBidForm post={post}/>
        </Togglable>
      )}
      <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
    marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjoukset</Typography>
      <Box>
        <OpenPostBidCard post={post}/>
      </Box>
    </Container>
  )
}

export default SingleFeedPost