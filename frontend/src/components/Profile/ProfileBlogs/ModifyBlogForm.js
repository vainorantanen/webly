import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../../hooks'
import LoginSuggestion from '../../LoginSuggestion'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../../../reducers/blogs'

const ModifyBlogForm = () => {

    const [description, setDescription] = useState('')
  const [ title, setTitle ] = useState('')

  const user = useSelector(({ user }) => user)

    const { id } = useParams()

    const blog = useSelector(({blogs}) => blogs).find(b => b.id === id)

  const notify = useNotification()
  const dispatch = useDispatch()

  useEffect(() => {
    if (blog) {
      setDescription(blog.description);
      setTitle(blog.title)
    }
  }, [blog]);

    const handleBlogModify = async (e) => {
        e.preventDefault()

        try {
            const result = await dispatch(updateBlog({...blog, description,
            title }))
            if (result && result.error) {
                notify('Tapahtui virhe palvelimella', 'error')
                return
              } else {
                notify('Blogi muokattu onnistuneesti', 'success')
                }
        } catch (error) {
          notify('Ilmeni jokin ongelma, yritä myöhemmin uudelleen', 'error')
        }
    }

    if (!user || !blog || user.id !== blog.user.id) {
        return (
            <LoginSuggestion />
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
      Muokkaa blogia
    </Typography>

    <Box
      component="form"
      onSubmit={handleBlogModify}
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
          Päivitä
          </Button>
    </Box>
  </Container>
  )
}

export default ModifyBlogForm