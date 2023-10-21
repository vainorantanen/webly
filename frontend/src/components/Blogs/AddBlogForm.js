import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../hooks'
import { addBlog } from '../../reducers/blogs'
import LoginSuggestion from '../LoginSuggestion'
import UserDisabledText from '../UserDisabledText'

const AddBlogForm = () => {
  const [description, setDescription] = useState('')
  const [ title, setTitle ] = useState('')

  const user = useSelector(({ user }) => user)
  const notify = useNotification()
  
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const result = await dispatch(addBlog({title, description}))
        if (result && result.error) {
          notify('Tapahtui virhe palvelimella', 'error')
          return
        } else {
          notify('Blogi lisätty onnistuneesti', 'success')
          setDescription('')
          setTitle('')
          }
    } catch (error) {
      notify('Ilmeni jokin ongelma, yritä myöhemmin uudelleen', 'error')
    }

  }

  if (!user || user.userType === 'regular') {
    return (
      <LoginSuggestion />
    )
  }

  if (user && user.disabled) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <UserDisabledText />
      </Container>
    )
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        borderRadius: '0.5rem',
        marginTop: '5rem'
      }}
    >
      <Typography
        sx={{
          fontSize: '1.5rem',
          textAlign: 'center',
          marginTop: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >
        Lisää Uusi Blogi
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
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
          id="title"
          label="Otsikko"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="description"
          label="Kirjoita blogisi tähän"
          required
          multiline
          rows={15}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button className="bn632-hover bn26"
            type='submit'
            fullWidth
            sx={{color: 'white',
            }}>
            Julkaise
            </Button>
      </Box>
    </Container>
  )
}

export default AddBlogForm