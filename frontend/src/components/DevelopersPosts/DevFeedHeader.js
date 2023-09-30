import { Container, Typography } from '@mui/material'
import React from 'react'

const DevFeedHeader = () => {
  return (
    <Container>
      <Typography
        sx={{
          fontSize: '2rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.4rem',
          },
        }}
      >
        Kehittäjien ilmoitukset
      </Typography>

      <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '3rem',
          '@media (max-width: 442px)': {
            fontSize: '1.1rem',
          },
        }}
      >
Selaa kehittäjien ilmoituksia ja löydä projektillesi kehittäjä
</Typography>
    </Container>
  )
}

export default DevFeedHeader