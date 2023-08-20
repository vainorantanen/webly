import { Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNotification } from '../../hooks'
import { updatePortalpost } from '../../reducers/portalPosts'

const ModifyBuyerPost = () => {
  
  const notify = useNotification()
  const dispatch = useDispatch()

    const postId = useParams().id
    const user = useSelector(({user}) => user)

    const userPortalPost = useSelector(({ portalPosts }) => portalPosts).find(p => p.id === postId)
    const [description, setDescription] = useState(userPortalPost.description);
    const handleSubmit = async () => {
      try {
          dispatch(updatePortalpost({...userPortalPost, description }))
          notify('Päivitys tehty onnistuneesti', 'success')
      } catch (error) {
          notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
      }
  }

    if (!userPortalPost || user.id !== userPortalPost.user.id) {
        <Container>
            <Typography>Error loading data</Typography>
        </Container>
    }

  return (
    <Container sx={{  backgroundColor: 'white', minHeight: '90vh', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
    marginTop: '5rem', borderRadius: '0.5rem' }}>
        <Typography sx={{ marginBottom: '4rem' }}>Muokkaa ilmoituksen sisältöä</Typography>
        <TextField
        id="description"
        label="Muokkaa esittelyä"
        multiline
        rows={16}
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: '1rem',  maxWidth: '40rem' }}
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

export default ModifyBuyerPost