import { Container, Typography } from '@mui/material'
import React from 'react'
import SendConfirmationEmailAgain from './SendConfirmationEmailAgain'

const ThanksForRegister = () => {
  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh', textAlign: 'center' }}>
        <Typography sx={{ fontSize: '1.4rem' }}>
            Kiitos rekisteröitymisestä!
        </Typography>
        <Typography sx={{ marginTop: '1rem' }}>
            Lähetimme ilmoittamaasi sähköpostiin vahvistuslinkin.
            Vahvista sähköpostisi, niin voit aloittaa palvelun käytön!
        </Typography>
        <Typography sx={{ marginTop: '2rem', paddingTop: '2rem',
      borderTop: '1px solid black' }}>Etkö saanut sähköpostia? Seuraa alla olevia ohjeita.</Typography>
        <SendConfirmationEmailAgain />
    </Container>
  )
}

export default ThanksForRegister