import { Container, Typography, Button, TextField, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { addPortalBid, initializePortalBids } from '../../reducers/portalBids'
import { makePortalOffer } from '../../reducers/portalPosts'



const MakeBidForm = ({ post }) => {
  const [description, setDescription] = useState('')
  const [ price, setPrice ] = useState(0)

  const notify = useNotification()
  
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(addPortalBid({description, price, target: post}))
      setDescription('')
      setPrice(0)
      notify('Tarjous lisätty onnistuneesti', 'success')
      //dispatch(initializePortalBids())
    } catch (error) {
      notify('Ilmeni jokin ongelma tarjouksen teossa, yritä myöhemmin uudelleen', 'error')
    }
    
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography sx={{ marginTop: '1rem' }}>Tarjoa</Typography>
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
          id="price"
          label="Hintapyyntö"
          type='number'
          value={price}
          onChange={({ target }) => setPrice(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="description"
          label="Kerro tarjouksestasi tarkemmin"
          multiline
          rows={12}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
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
          Lähetä tarjous
        </Button>
      </Box>
    </Container>
  )
}

export default MakeBidForm