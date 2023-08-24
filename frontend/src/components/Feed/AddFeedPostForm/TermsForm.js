import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
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

import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TermsForm = forwardRef((props, ref) => {
  const formData = useSelector(state => state.formData)

  const [date, setDate] = useState(formData.date)
  const [isOpen, setIsOpen] = useState(formData.isOpen)
  const [minPrice, setMinPrice] = useState(formData.minPrice)
  const [maxPrice, setMaxPrice] = useState(formData.maxPrice)

  const notify = useNotification()
  const dispatch = useDispatch()

  const validateFields = () => {
    let isValid = true
    if (!date) {
      isValid = false
    } 
    if (minPrice === '' || maxPrice === '') {
      isValid = false
    } 
    if (minPrice > maxPrice) {
      notify('Minimihinta ei voi olla suurempi kuin maksimihinta', 'error')
      isValid = false
    }
    return isValid
  }
      
  const handleSubmit = async (event) => {
    if (!validateFields()) {
      return
    }
    dispatch(update({
      date,
      isOpen,
      minPrice,
      maxPrice
    }))
  }

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit
  }))

  useEffect(() => {
    setDate(formData.date)
    setIsOpen(formData.isOpen)
    setMinPrice(formData.minPrice)
    setMaxPrice(formData.maxPrice)
  }
  , [formData])

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
            defaultValue={dayjs()}
            value={date}
            required
            format='DD.MM.YYYY'
            onChange={(newValue) => {
              setDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
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
            onChange={(event) => setIsOpen(event.target.value)}
          >
            <FormControlLabel value={true} control={<Radio />} label="Kyllä" />
            <FormControlLabel value={false} control={<Radio />} label="Ei" />
          </RadioGroup>
        {/* Question 3 */}
        <Typography>Hintahaarukka (esitä hintatoiveesi projektista)</Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>

          <FormControl fullWidth sx={{ m: 1 }} value={minPrice} required onChange={(event) => setMinPrice(event.target.value)}>
              <InputLabel htmlFor="outlined-adornment-amount">Min</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                label="min"
              />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} value={maxPrice} required onChange={(event) => setMaxPrice(event.target.value)}>
              <InputLabel htmlFor="outlined-adornment-amount">Max</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">€</InputAdornment>}
                label="max"
              />
          </FormControl>
        </Box>
        
      </Box>
    </Container>
  )
})

export default TermsForm