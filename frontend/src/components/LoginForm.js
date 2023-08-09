import React from 'react'
import { useState } from 'react'
import { Container, Box, TextField, Button, Typography } from '@mui/material'
import Togglable from './Togglable'
import RegisterPage from './RegisterPage'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ login, registerFormRef, addUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
      setUsername('')
      setPassword('')

      navigate('/')
    } catch (error) {
      console.log('error:', error) // Error message
    }
  }

  return (
    <Container sx={{ marginTop: '5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <Box>
        <Typography sx={{
          fontSize: '2rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}>Kirjaudu Nettisivutoriin</Typography>
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
        <Typography>Käyttäjätunnus</Typography>
        <TextField
          id="login-username"
          label="Käyttäjätunnus"
          value={username}
          className="username-input"
          onChange={({ target }) => setUsername(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Typography>Salasana</Typography>
        <TextField
          id="login-password"
          label="Salasana"
          type="password"
          value={password}
          className='password-input'
          onChange={({ target }) => setPassword(target.value)}
          sx={{ marginBottom: '1rem' }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className='login-button-input'
          fullWidth
          sx={{ backgroundColor: 'blue', color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
          }}
        >
          Kirjaudu
        </Button>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: '2rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}>Eikö sinulla ole vielä käyttäjää? Reksiteröidy</Typography>
        <Togglable buttonLabel='Rekisteröidy' ref={registerFormRef}>
          <RegisterPage addUser={addUser}/>
        </Togglable>
      </Box>
    </Container>
  )
}

export default LoginForm
