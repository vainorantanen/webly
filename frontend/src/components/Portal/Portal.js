import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import DevPortal from './DevPortal'
import BuyerPortal from './BuyerPortal'

const Portal = () => {

  const user = useSelector(({user}) => user)

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

        {user && user.isCompany ? (
          <DevPortal />
        ) : (
          <BuyerPortal />
        )}
    </Box>
  )
}

export default Portal