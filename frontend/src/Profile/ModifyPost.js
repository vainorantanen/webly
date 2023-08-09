import { Container, TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import feedpostService from '../services/feedposts'

const ModifyPost = ({ post }) => {
  const [description, setDescription] = useState(post.description)

  const handleSubmit = async () => {
    await feedpostService.update({ ...post, description: description })
    //setpost({ ...post, description: description })
    setDescription('')
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <TextField
        id="description"
        label="Muokkaa esittelyä"
        multiline
        rows={8}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: '1rem', width: '100%', maxWidth: '30rem' }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
          },
        }}
      >
          Päivitä
      </Button>
    </Container>
  )
}

export default ModifyPost