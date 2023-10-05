import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleFeedPostInfo from '../Feed/SingleFeedPostInfo'
import { Link, useParams } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { modifyBidApprovedState, removBidFromPortalpost } from '../../reducers/portalPosts'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const SinglePostPortalView = () => {
    const user = useSelector(({user}) => user)

    const dispatch = useDispatch()
  const notifyWith = useNotification()


    const {id} = useParams()

    const post = useSelector(({portalPosts}) => portalPosts).find(p => p.id === id)
    
  // Funktioita
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
      dispatch(removBidFromPortalpost(bidId, post.id))
      notifyWith('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  // portaalipostauksen voi nähdä sen lisännyt käyttäjä ja kehittäjät
    if (!user || !post || (user.userType === 'regular' && post.user.id !== user.id)) {
      return (
        <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
          <Typography>Kirjaudu sisään nähdäksesi portaali</Typography>
        </Container>
      )
    }

    const userBidsOnPost = post.portalBids.filter(bid =>
      bid.user === user.id
    );

  return (
    <Box sx={{ marginTop: '5rem', minHeight: '90vh' }}>
      <Typography sx={{ textAlign: 'center', fontSize: '1.3rem',
    marginBottom: '1rem' }}>Portaali-ilmoitus</Typography>
      <SingleFeedPostInfo post={post}/>
      {/*Näkymä kehittäjille*/}
      {user && user.userType !== 'regular' && (
        <Box>
          <Togglable buttonLabel='Tee tarjous'>
            <MakeBidForm post={post}/>
          </Togglable>
      
          <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
    marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjouksesi tähän ilmoitukseen</Typography>
        <Box>
          {user && userBidsOnPost.length > 0 ? userBidsOnPost.map(offer => (
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
              marginTop: '1rem',
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
              <Typography><Button component={Link} to={`/kehittajat/${offer.user}`}>{offer.offeror}</Button></Typography>
              <Typography>{offer.timeStamp.split('T')[0]}</Typography>
              <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
              {user && (user.id === post.user.id || user.id === offer.user) && (
                <Button sx={{ color: 'red' }} onClick={() => handleDeletebid(offer.id)}>Poista tarjous</Button>
              )}
            </Box>
          )): <Typography sx={{ textAlign: 'center' }}>Et ole tarjonnut tähän vielä</Typography>}
        </Box>
        </Box>
      )}
      {/*Näkymä portaalipostauksen tekijälle */}
      {user && user.id === post.user.id && (
        <Box>
          <Typography sx={{ fontSize: '1.5rem', marginTop: '1rem',
    marginBottom: '1rem', borderBottom: '1px solid black', textAlign: 'center' }}>Tarjoukset</Typography>
      <Box>
        {post.portalBids.map(offer => (
          <Box key={offer.id}
          sx={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            color: 'black',
            marginLeft: '3rem',
            marginRight: '3rem',
            marginTop: '1rem',
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
            <Typography><Button component={Link} to={`/kehittajat/${offer.user}`}>{offer.offeror}</Button></Typography>
            <Typography>{offer.timeStamp.split('T')[0] || 'ei tietoa'}</Typography>
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
          </Box>
      )}
    </Box>
  )
}

export default SinglePostPortalView