import { Container, Typography, Button, TextField, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { addPortalBid } from '../../reducers/portalBids'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MakeBidForm = ({ post }) => {
  const [description, setDescription] = useState('')
  const [ price, setPrice ] = useState(0)
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState(false)

  const notify = useNotification()
  
  const dispatch = useDispatch()

  const validDate = () => {
    if (!date) {
      return null
    } else {
      const dateArray = date.split('.')
      const validDateString = dateArray.reverse().join('-')
      const dateObject = dayjs(validDateString)
      return dateObject
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateFields()) {
      return
    }
    try {
      dispatch(addPortalBid({description, price, target: post, dueDate: date}))
      setDescription('')
      setPrice(0)
      notify('Tarjous lisätty onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma tarjouksen teossa, yritä myöhemmin uudelleen', 'error')
    }
    
  }

  const validateFields = () => {
    let isValid = true
    if (!validDate) {
      console.log('date', date)
      notify('Aseta takaraja', 'error')
      setDateError(true)
      isValid = false
    } else {
      setDateError(false)
    }

    return isValid
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
        <Typography>Aseta tarjouksesi voimassaololle takaraja</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Aseta takaraja"
            error={dateError}
            value={date}
            format="DD.MM.YYYY"
            minDate={dayjs().add(1, 'day')}
            onChange={(newValue) => {
              setDate(newValue)
            }}
          />
        </LocalizationProvider>
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