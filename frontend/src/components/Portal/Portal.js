import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DevPortal from './DevPortal'
import BuyerPortal from './BuyerPortal'
import { initializePortalposts } from '../../reducers/portalPosts'
import { initializePortalBids } from '../../reducers/portalBids'

const Portal = () => {

  const user = useSelector(({user}) => user)

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch portal posts when the component mounts
    try {
        dispatch(initializePortalposts())
        dispatch(initializePortalBids())
    } catch (error) {
        console.error('Error fetching portal posts:', error);
    }
  }, [dispatch]);

  if (!user) {
    return (
      <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
        <Typography>Kirjaudu sisään nähdäksesi portaali</Typography>
      </Container>
    )
  }

  return (
    <Box sx={{ marginTop: '5rem', minHeight: '90vh' }}>
        <Typography sx={{
          fontSize: '1.8rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.3rem',
          },
        }}>
            Portaali
        </Typography>

        {user && user.userType !== 'regular' ? (
          <DevPortal />
        ) : (
          <BuyerPortal />
        )}
    </Box>
  )
}

export default Portal