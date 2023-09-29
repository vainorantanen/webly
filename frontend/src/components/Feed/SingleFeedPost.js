import { Typography, Box, Container, Button } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNotification } from '../../hooks'
import { useDispatch } from 'react-redux'
import { modifyBidApprovedState, removBidFromFeedPost } from '../../reducers/feedPosts'
import EuroIcon from '@mui/icons-material/Euro';


const SingleFeedPost = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const post = useSelector(({feedPosts}) => feedPosts.find(p => p.id === id))

  const handleAcceptbid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti hyväksyä tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(modifyBidApprovedState(bidId, post.id))
      notifyWith('Tarjous hyväksytty', 'success')
    } catch (error) {
      notifyWith('Tarjouksen hyväksyntä epäonnistui', 'error')
    }

  }

  const handleDeletebid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removBidFromFeedPost(bidId, post.id))
      notifyWith('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  if (!post) {
    return null
  }

  return (
    <Container  sx={{ marginTop: '7rem', minHeight: '100vh' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          border: '1px solid black',
          borderRadius: '1rem',
          marginLeft: '8rem',
          marginRight: '8rem',
          display: 'flex',
          flexDirection: 'column',
          '@media (max-width: 820px)': {
            marginLeft: '0.1rem',
            marginRight: '0.1rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginBottom: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography>{post.user.name}</Typography>
            {post.timeStamp ? (
              <Typography>Julkaistu {post.timeStamp.split('T')[0]}</Typography>
            ) : <Typography>Julkaistu yli vuosi sitten</Typography>}
          </div>
        </Box>
        <Typography>Ilmoitus sulkeutuu: {post.dueDate}</Typography>
        <Typography><EuroIcon />{post.minPrice} - {post.maxPrice}</Typography>
        <Typography>Tarkoitus:</Typography>
        <Typography style={{ whiteSpace: 'break-spaces' }}>{post.description}</Typography>
        <Typography>Sivut on suunnattu: {post.question1}</Typography>
        <Typography>Teknologiset rajoitteet: {post.question2}</Typography>
        <Typography>Sisällönhallintatyökalut: {post.question3}</Typography>
        <Typography>Toiminnallisuudet: {post.question4}</Typography>
        <Typography>Muut toiveet:</Typography>
        <Typography>{post.other}</Typography>
      </Box>
      {user && user.userType !== 'regular' && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeBidForm post={post}/>
        </Togglable>
      )}
      <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
    marginBottom: '1rem', borderBottom: '1px solid black' }}>Tarjoukset</Typography>
      <Box>
        {post.feedBids.map(offer => (
          <Box key={offer.id} sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            {offer.isApproved && (
              <Typography>Tarjous hyväksytty <CheckCircleIcon/></Typography>
            )}
            <Typography>Hinta: {offer.price} euroa</Typography>
            <Typography>{offer.offeror}</Typography>
            <Typography>{offer.timeStamp.split('T')[0]}</Typography>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
            {user && user.id === post.user.id && !offer.isApproved ? (
              <Button onClick={() => handleAcceptbid(offer.id)}>Hyväksy tarjous</Button>
            ): null}
            {user && (user.id === post.user.id || user.id === offer.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeletebid(offer.id)}>Poista tarjous</Button>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default SingleFeedPost