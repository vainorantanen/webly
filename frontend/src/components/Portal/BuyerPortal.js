import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PortalPostCard from './PortalPostCard'

const BuyerPortal = () => {
    const user = useSelector(({user}) => user)
    const portalProjects = useSelector(({ portalPosts }) => portalPosts).filter(p => (p.user.id === user.id))

    if (!portalProjects || portalProjects.length === 0) {
        return <Typography>Ei portaali-ilmoituksia</Typography>
    }

  return (
    <Container>
        <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
    borderBottom: '1px solid black' }}>Omat portaali-ilmoitukseni</Typography>
        {portalProjects.map(proj => (
            <Box key={proj.id}>
                <PortalPostCard post={proj}/>
            </Box>
        ))}
    </Container>
  )
}

export default BuyerPortal