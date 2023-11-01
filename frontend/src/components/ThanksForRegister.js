import { Container, Typography } from '@mui/material'
import React from 'react'
import SendConfirmationEmailAgain from './SendConfirmationEmailAgain'

const ThanksForRegister = () => {
  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography>
            Kiitos rekisteröitymisestä!
        </Typography>
        <Typography>
            Lähetimme sinulle sähköpostin ilmoittamaasi osoitteeseen.
            Vahvista sähköpostisi, niin voita aloittaa palvelun käytön!
        </Typography>
        <Typography>Etkö saanut sähköpostia?</Typography>
        <SendConfirmationEmailAgain />
    </Container>
  )
}

export default ThanksForRegister