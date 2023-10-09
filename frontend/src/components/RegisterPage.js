import React, { useState } from 'react'
import { TextField, Button, Typography, Box,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  InputAdornment
} from '@mui/material'
import { useNotification } from '../hooks'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { addUser } from '../reducers/users';

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [ description, setDescription ] = useState('')
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [openTermsDialog, setOpenTermsDialog] = useState(false)
  const [ userType, setUserType ] = useState('regular')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [ email, setEmail ] = useState('')

  const notify = useNotification()
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      // Passwords don't match, handle error here (e.g., display an error message)
      console.log('Salasanat eivät täsmää!')
      return
    }

    try {

    dispatch(addUser({ username, name, password, description,
      userType, email }))
    setName('')
    setPassword('')
    setUsername('')
    setDescription('')
    setUserType('regular')
    setIsTermsAccepted(false)
    setEmail('')
    setConfirmPassword('')
      notify('Käyttäjä rekisteröity onnistuneesti', 'success')
    } catch (error) {
      notify('Rekiströinti epäonnistui', 'error')
    }
  }

  const handleTermsDialogOpen = () => {
    setOpenTermsDialog(true)
  }

  const handleTermsDialogClose = () => {
    setOpenTermsDialog(false)
  }

  const handleCheckboxChange = (e) => {
    setIsTermsAccepted(e.target.checked)
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <Box sx={{ marginTop: '5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '3rem' }}>
      <Typography sx={{
        fontSize: '2rem',
        textAlign: 'center',
        '@media (max-width: 442px)': {
          fontSize: '1.5rem',
        },
      }}>
        Luo uusi käyttäjä
      </Typography>
      <Box sx={{ maxWidth: '30rem', }} component="form" onSubmit={handleSubmit}>
      <FormControl component="fieldset">
          <FormLabel component="legend">Valitse käyttäjätyyppi</FormLabel>
          <RadioGroup
            aria-label="userType"
            name="userType"
            value={userType}
            onChange={handleUserTypeChange}
          >
            <FormControlLabel
              value="regular"
              control={<Radio />}
              label="Projektia etsivä asiakas"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Kehittäjäyritys"
            />
            <FormControlLabel
              value="freelancer"
              control={<Radio />}
              label="Freelancer"
            />
            <FormControlLabel
              value="otherDev"
              control={<Radio />}
              label="Muu kehittäjä"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="register-username"
          label="Käyttäjätunnus"
          required
          fullWidth
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          margin="normal"
        />
        <TextField
          id="name"
          label="Nimi (näkyy muille käyttäjille)"
          required
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
          margin="normal"
        />
        <TextField
          id="email"
          label="Sähköposti"
          required
          type='email'
          fullWidth
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          margin="normal"
        />
        <TextField
          id="register-password"
          label="Salasana (vähintään 3 merkkiä pitkä)"
          type="password"
          required
          fullWidth
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {password.length > 0 && password.length < 3 ? <CancelIcon /> : null}
                {password.length >= 3 ? <CheckCircleIcon /> : null}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="confirm-password"
          label="Vahvista salasana"
          type="password"
          required
          fullWidth
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {passwordsMatch && password.length !== 0 && (
            <CheckCircleIcon />
        )}
              </InputAdornment>
            ),}}
        />
        <TextField
          id="description"
          label="Kerro itsestäsi muutamalla sanalla (valinnainen)"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isTermsAccepted}
              onChange={handleCheckboxChange}
              required
            />
          }
          label={
            <Typography
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleTermsDialogOpen}
            >
              Hyväksyn palvelun käyttöehdot
            </Typography>
          }
          sx={{ marginBottom: '1rem' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button className="login-button-input bn632-hover bn26"
            type='submit'
            fullWidth
            sx={{color: 'white',
            }}>
            Reksiteröidy
            </Button>
        </Box>
      </Box>
      <Dialog open={openTermsDialog} onClose={handleTermsDialogClose}>
        <DialogTitle>Palvelun käyttöehdot</DialogTitle>
        <DialogContent>
          {/* Add your terms of service content here */}
          <Typography>
          Hyväksyn kaiken tietojen käytön. Huom! Ohjelmistomme on vielä kehitysvaiheessa.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose}>Sulje</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RegisterPage
