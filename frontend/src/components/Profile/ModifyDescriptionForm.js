import { Container, TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { updateUser } from '../../reducers/user'
import { useSelector } from 'react-redux'

const ModifyDescriptionForm = () => {

  const notify = useNotification()
    const dispatch = useDispatch()
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  const [description, setDescription] = useState(user.description)

  const handleSubmit = async () => {
    try {
        dispatch(updateUser({...user, description }))
        setDescription('')
        notify('Päivitys tehty onnistuneesti', 'success')
    } catch (error) {
        notify('Ilmeni jokin ongelma päivityksessä, yritä myöhemmin uudelleen', 'error')
    }
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

export default ModifyDescriptionForm
