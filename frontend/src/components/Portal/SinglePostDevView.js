import { Typography, Box, Container, Button } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNotification } from '../../hooks'
import { useDispatch } from 'react-redux'
import { removBidFromPortalpost } from '../../reducers/portalPosts'

const SinglePostDevView = () => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const user = useSelector(({ user }) => user)
  const id = useParams().id
  const post = useSelector(({ portalPosts }) => portalPosts).find(p => p.id === id)

  const handleDeletebid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removBidFromPortalpost(bidId, post.id))
      notifyWith('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  if (!post) {
    return (
        <Container sx={{ marginTop: '7rem', minHeight: '100vh' }}>
            <Typography>Ei postausta</Typography>
        </Container>
    )
  }

  const userBidsOnPost = post.feedBids.filter(bid =>
    bid.user === user.id
  );

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
        <Typography style={{ whiteSpace: 'break-spaces' }}>{post.description}</Typography>
      </Box>
      {user && user.userType !== 'regular' && (
        <Togglable buttonLabel='Tee tarjous'>
          <MakeBidForm post={post}/>
        </Togglable>
      )}
      <Typography>Tarjouksesi tähän projektiin</Typography>
      <Box>
        {user && userBidsOnPost.length > 0 ? userBidsOnPost.map(offer => (
          <Box key={offer.id} sx={{ color: 'black', backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
            {offer.isApproved && (
              <Typography>Tarjous hyväksytty <CheckCircleIcon/></Typography>
            )}
            <Typography>Hinta: {offer.price} euroa</Typography>
            <Typography>{offer.offeror}</Typography>
            <Typography>{offer.timeStamp.split('T')[0]}</Typography>
            <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
            {user && (user.id === post.user.id || user.id === offer.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeletebid(offer.id)}>Poista tarjous</Button>
            )}
          </Box>
        )): <Typography>Et ole tarjonnut tähän vielä</Typography>}
      </Box>
    </Container>
  )
}

export default SinglePostDevView