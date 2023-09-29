import { Container, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const FeedHeader = () => {
  return (
    <Container>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}
      >Avoimet ilmoitukset</Typography>

      <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >Selaa avoimia ilmoituksia nettisivuista ja muista verkkopohjaisista ohjelmistoprojekteista</Typography>
      <Button
        component={Link}
        to="/lisaailmoitus"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          marginTop: '1rem',
          marginBottom: '1rem',
          marginLeft: '1rem',
          borderRadius: '1rem',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
          },
        }}
      >Lisää ilmoitus
      </Button>
    </Container>
  )
}

export default FeedHeader