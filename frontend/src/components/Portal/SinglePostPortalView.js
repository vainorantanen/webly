import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import SingleFeedPostInfo from '../Feed/SingleFeedPostInfo'
import { useParams } from 'react-router-dom'
import Togglable from '../Togglable'
import MakeBidForm from './MakeBidForm'
import PortalBidCard from './PortalBidCard'

const SinglePostPortalView = () => {
    const user = useSelector(({user}) => user)

    const {id} = useParams()

    const post = useSelector(({portalPosts}) => portalPosts).find(p => p.id === id)
    const portalBidsToShow = useSelector(({portalBids}) => portalBids)

  // Funktioita
  

  // portaalipostauksen voi nähdä sen lisännyt käyttäjä ja kehittäjät
    if (!user || !post || (user.userType === 'regular' && post.user.id !== user.id)) {
      return (
        <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
          <Typography>Kirjaudu sisään nähdäksesi portaali</Typography>
        </Container>
      )
    }

    // pakko hakea bidit siten, että looppaa portalbidsejä, joiden tekijä on user
    const developerBidsOnPost = portalBidsToShow.filter(bid =>
      bid.targetPost === id
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
          {user && developerBidsOnPost.length > 0 ? developerBidsOnPost.map(offer => (
            <Box key={offer.id}>
              <PortalBidCard offer={offer} post={post}/>
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
        {portalBidsToShow && portalBidsToShow.length > 0 ? (
          portalBidsToShow.map(offer => (
          <Box key={offer.id}>
            <PortalBidCard offer={offer} post={post}/>
          </Box>
        ))): (
          <Typography sx={{ textAlign: 'center' }}>Ei vielä tarjouksia</Typography>
        )}
      </Box>
          </Box>
      )}
    </Box>
  )
}

export default SinglePostPortalView