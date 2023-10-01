import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PortalPostCard from './PortalPostCard'

const DevPortal = () => {

    const portalProjects = useSelector(({ portalPosts }) => portalPosts)

    if (!portalProjects || portalProjects.length === 0) {
        return <Typography>Loading...</Typography>
    }

  return (
    <Container>
        <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem',
    borderBottom: '1px solid black' }}>Avoimet portaali-ilmoitukset</Typography>
        {portalProjects.filter(p => p.isOpen).map(proj => (
            <Box key={proj.id}>
                <PortalPostCard post={proj}/>
            </Box>
        ))}
    </Container>
  )
}

export default DevPortal