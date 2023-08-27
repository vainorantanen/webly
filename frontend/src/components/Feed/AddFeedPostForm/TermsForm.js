import {
  Box,
  Container,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { useNotification } from '../../../hooks';
import { update } from '../../../reducers/formData';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TermsForm = forwardRef((props, ref) => {
  const formData = useSelector(state => state.formData)

  const validDate = () => {
    if (!formData.date) {
      return null
    } else {
      const dateArray = formData.date.split('.')
      const validDateString = dateArray.reverse().join('-')
      const dateObject = dayjs(validDateString)
      return dateObject
    }
  }

  const [date, setDate] = useState(validDate())
  const [isOpen, setIsOpen] = useState(formData.isOpen)
  const [minPrice, setMinPrice] = useState(formData.minPrice)
  const [maxPrice, setMaxPrice] = useState(formData.maxPrice)

  const [dateError, setDateError] = useState(false)
  const [minPriceError, setMinPriceError] = useState(false)
  const [maxPriceError, setMaxPriceError] = useState(false)

  const notify = useNotification()
  const dispatch = useDispatch()

  const validateFields = () => {
    let isValid = true
    if (!date) {
      console.log('date', date)
      notify('Aseta takaraja', 'error')
      setDateError(true)
      isValid = false
    } else {
      setDateError(false)
    }

    if (minPrice === '' || maxPrice === '') {
      console.log('minPrice', minPrice)
      notify('Aseta hintahaarukka', 'error')
      setMinPriceError(true)
      setMaxPriceError(true)
      isValid = false
    } else {
      setMinPriceError(false)
      setMaxPriceError(false)
    }
    
    if (parseInt(minPrice) >= parseInt(maxPrice)) {
      notify('Minimihinta ei voi olla suurempi kuin maksimihinta', 'error')
      setMaxPriceError(true)
      isValid = false
    } else {
      setMaxPriceError(false)
    }

    return isValid
  }
      
  const handleSubmit = async (event) => {
    if (!validateFields()) {
      return
    }
    dispatch(update({
      date: dayjs(date).format('DD.MM.YYYY').toString(),
      isOpen,
      minPrice,
      maxPrice
    }))
  }

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit,
    validateFields: validateFields
  }))

  const handleRadioChange = (event) => {
    setIsOpen(event.target.value === 'true')
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        backgroundColor: 'white',
        borderRadius: '1rem',
      }}
    >
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
        {/* Question 1 */}
        <Typography>Aseta tarjouskilpailullesi takaraja</Typography>
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

        {/* Question 2 */}
        <Typography>Avoin kilpailu (Jos kilpailu on avoin tarjoukset ovat julkisia.)</Typography>
        <RadioGroup
            aria-label="isOpen"
            name="isOpen"
            required
            value={isOpen}
            sx={{ marginBottom: '2rem' }}
            onChange={handleRadioChange}
          >
            <FormControlLabel value='true' control={<Radio />} label="Kyllä" />
            <FormControlLabel value='false' control={<Radio />} label="Ei" />
          </RadioGroup>
        {/* Question 3 */}
        <Typography>Hintahaarukka (esitä hintatoiveesi projektista)</Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            label="Minimihinta"
            type='number'
            id="minPrice"
            error={minPriceError}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            value={minPrice}
            required
            onChange={(event) => setMinPrice(event.target.value)}
          />
          <Typography
            sx={{
              m: 1,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.3rem',
            }}
          >-</Typography>
          <TextField
            label="Maksimihinta"
            type='number'
            id="maxPrice"
            error={maxPriceError}
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            value={maxPrice}
            required
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </Box>
        
      </Box>
    </Container>
  )
})

export default TermsForm