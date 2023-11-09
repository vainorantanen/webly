import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import { useSelector } from 'react-redux'
import SingleFeedPostInfo from './SingleFeedPostInfo'
import OpenPostBids from './OpenPostBids'
import { formatDate } from '../../Functions/formatDate'

const SingleFeedPost = () => {

  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const post = useSelector(({feedPosts}) => feedPosts.find(p => p.id === id))

if (!post) {
  return null
}  

  return (
    <Container  sx={{ marginTop: '7rem', minHeight: '100vh' }}>
      {new Date(post.dueDate) < new Date() && (
        <Typography variant='h4' sx={{ textAlign: 'center' }}>Ilmoitus on sulkeutunut {formatDate(post.dueDate)}</Typography>
      )}
      <SingleFeedPostInfo post={post}/>
      {user && user.userType !== 'regular' && new Date(post.dueDate) > new Date() && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeBidForm post={post}/>
        </Togglable>
      )}
      <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
    marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjoukset</Typography>
      <Box>
        <OpenPostBids post={post}/>
      </Box>
    </Container>
  )
}

export default SingleFeedPost