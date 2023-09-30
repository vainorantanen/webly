import { Typography, Box, Container, Button } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNotification } from '../../hooks'
import { useDispatch } from 'react-redux'
import { modifyBidApprovedState, removBidFromFeedPost } from '../../reducers/feedPosts'
import SingleFeedPostInfo from './SingleFeedPostInfo'


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
      <SingleFeedPostInfo post={post}/>
      {user && user.userType !== 'regular' && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeBidForm post={post}/>
        </Togglable>
      )}
      <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
    marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjoukset</Typography>
      <Box>
        {post.feedBids.length > 0 ? post.feedBids.map(offer => (
          <Box key={offer.id}
          sx={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            color: 'black',
            marginLeft: '3rem',
            marginRight: '3rem',
            display: 'flex',
            transition: '0.3s ease',
            flexDirection: 'column',
            '@media (max-width: 820px)': {
              marginLeft: '0.1rem',
              marginRight: '0.1rem',
            },
          }}
          >
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
        )) : (
          <Typography sx={{ textAlign: 'center' }}>Ei vielä tarjouksia</Typography>
        )}
      </Box>
    </Container>
  )
}

export default SingleFeedPost