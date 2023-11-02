import React from 'react'
import { Container, Typography, Button, Paper, Grid, Divider, Box } from '@mui/material'
import { useSelector } from 'react-redux'
//import ModifyBasicInfo from './ModifyBasicInfo'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import { Link } from 'react-router-dom'
import DevBids from './DevBids'
import LoginSuggestion from '../LoginSuggestion'


const CompanyProfile = () => {
  const user = useSelector(({user}) => user)

  if (!user || user.userType === 'regular') {
    return (
      <LoginSuggestion />
    )
  }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#1976D2', color: '#fff', marginBottom: '2rem' }}>
        <Typography variant="body1">
          Tervetuloa Profiiliin, {user.name}!
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Profiili</Typography>
          {!user.emailConfirmed && (
        <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#f44336', color: '#fff' }}>
          <Typography variant="body1">
          Sähköpostisi ei ole vahvistettu. Vahvista se alla olevasta napista.
        </Typography>
          <Button sx={{ color: 'white' }}
        component={Link} to='/laheta-uusi-vahvistus'>
          Vahvista sähköposti</Button>
        </Paper>
      )}
          <Typography>Sähköposti: {user.email}</Typography>
          <ModifyDescriptionForm />
        </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Navigoi</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button variant="outlined" component={Link} to='/lisaa-blogi'>
        Lisää blogi
      </Button>
      <Button variant="outlined" component={Link} to='/profiili/yhteydenotot'>
        Yhteydenotot
      </Button>
      <Button variant="outlined" component={Link} to='/profiili/kehittaja/omat-ilmoitukset'>
        Omat ilmoitukset
      </Button>
      <Button variant="outlined" component={Link} to='/profiili/kehittaja/omat-blogit'>
        Omat blogit
      </Button>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Seuraa tekemiesi tarjousten tilannetta</Typography>
      <Button variant="outlined" component={Link} to='/profiili/kehittaja/hyvaksytyt-tarjoukset'>
        Katso kaikki hyväksytyt tarjoukset
      </Button>
      </Box>
      </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <DevBids />
    </Container>
  )
}

export default CompanyProfile
