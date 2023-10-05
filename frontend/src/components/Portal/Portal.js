import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializePortalposts } from '../../reducers/portalPosts'
import { initializePortalBids } from '../../reducers/portalBids'
import PortalPostCard from './PortalPostCard'

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

  const portalProjects = useSelector(({portalPosts}) => portalPosts)

  if (!user) {
    return (
      <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
        <Typography>Kirjaudu sisään nähdäksesi portaali</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '90vh' }}>
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

        <Container>
        {user.userType === 'regular' ? (
          <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
          borderBottom: '1px solid black' }}>Omat portaali-ilmoitukseni</Typography>
        ): (
          <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
    borderBottom: '1px solid black' }}>Avoimet portaali-ilmoitukset</Typography>
        )}
        {portalProjects.map(proj => (
            <Box key={proj.id}>
                <PortalPostCard post={proj}/>
            </Box>
        ))}
    </Container>
    </Container>
  )
}

export default Portal