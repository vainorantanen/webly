import { Box, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializePortalposts } from '../../reducers/portalPosts'
import { initializePortalBids } from '../../reducers/portalBids'
import PortalPostCard from './PortalPostCard'
import LoginSuggestion from '../LoginSuggestion'
import { useNotification } from '../../hooks'

const Portal = () => {

  const user = useSelector(({user}) => user)
  const notify = useNotification()

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch portal posts when the component mounts
    try {
        dispatch(initializePortalposts())
        dispatch(initializePortalBids())
    } catch (error) {
        notify('Tapahtui virhe haettaessa portaalin tietoja')
        console.error('Error fetching portal posts:', error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const portalProjects = useSelector(({portalPosts}) => portalPosts).filter(p => p.isOpen)
  const numberOfPortalProjects = portalProjects.length

  if (!user) {
    return (
      <LoginSuggestion />
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
          borderBottom: '1px solid black' }}>Omat avoimet portaali-ilmoitukseni ({numberOfPortalProjects})</Typography>
        ): (
          <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
    borderBottom: '1px solid black' }}>Avoimet portaali-ilmoitukset ({numberOfPortalProjects})</Typography>
        )}
        {portalProjects && portalProjects.length > 0 ? (
          portalProjects.map(proj => (
            <Box key={proj.id}>
                <PortalPostCard post={proj}/>
            </Box>
        ))): (
          <Typography sx={{ textAlign: 'center' }}>Ei portaali-ilmoituksia</Typography>
        )}
    </Container>
    </Container>
  )
}

export default Portal