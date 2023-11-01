import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNotification } from '../hooks'
import confirmemail from '../services/confirmemail'

const SendConfirmationEmailAgain = () => {
    const [ email, setEmail ] = useState('')

    const notify = useNotification()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const stat = await confirmemail.send({ email })
          if (stat.Status === 'User not existed') {
            notify('Palvelinvirhe', 'error')
            return 
          }
          setEmail('')
          notify('Sähköposti lähetetty onnistuneesti', 'success')
        } catch (e) {
          notify('Syöttämälläsi sähköpostilla ei löytynyt käyttäjiä', 'error')
        }
      }

  return (
    <Container sx={{ marginTop: '5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
    }}>
      <Box>
        <Typography>Kirjoita sähköpostiosoitteesi,
             niin lähetämme sinulle uuden vahvistuslinkin</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        <TextField
          id="email"
          label="Sähköposti"
          type='email'
          required
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          className="bn632-hover bn26"
          fullWidth
          sx={{ color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',}}
        >
          Lähetä
        </Button>
    </Box>
    </Container>
  )
}

export default SendConfirmationEmailAgain