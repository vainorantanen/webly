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
  const user = useSelector(({user}) => user)

  const [description, setDescription] = useState(user.description)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
         const result = await dispatch(updateUser({ id: user.id, description }))
         if (result && result.error) {
          notify('Tapahtui virhe', 'error')
          return
         } else {
        notify('Päivitys tehty onnistuneesti', 'success')
         }
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
        variant="outlined"
      >
        Päivitä
      </Button>
    </Container>
  )
}

export default ModifyDescriptionForm
