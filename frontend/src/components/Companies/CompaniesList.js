import React from 'react'
import Company from './Company'
import { Box, Container, Typography } from '@mui/material'
import FeedItems from './FeedItems'

const CompaniesList = () => {
  return (
    <Container sx={{ marginTop: '8rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.4rem',
          },
        }}
      >
        Kehittäjät
      </Typography>

      <Typography
        sx={{
          fontSize: '1.6rem',
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '3rem',
          '@media (max-width: 442px)': {
            fontSize: '1.1rem',
          },
        }}
      >
        Tutustu alustalla toimiviin kehittäjiin. Selaa yrityksiä, freelancereitä ja muita kehittäjiä.
      </Typography>
      <FeedItems />
    </Container>
  )
}

export default CompaniesList
