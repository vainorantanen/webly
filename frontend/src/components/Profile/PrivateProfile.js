import React from 'react'
import { Container, Typography, Button, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import BuyersPosts from './BuyersPosts'
//import ModifyBasicInfo from './ModifyBasicInfo'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import { Link } from 'react-router-dom'
import LoginSuggestion from '../LoginSuggestion'

const PrivateProfile = () => {
  const user = useSelector(({user}) => user)

  const scrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  if (!user || user.userType !== 'regular') {
    return (
      <LoginSuggestion />
    )
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      {!user.emailConfirmed && (
        <Paper elevation={3} style={{ padding: '16px', backgroundColor: '#f44336', color: '#fff' }}>
          <Typography variant="body1">
          Sähköpostisi ei ole vahvistettu. Vahvista se alla olevasta napista.
        </Typography>
          <Button
        component={Link} to='/laheta-uusi-vahvistus'>
          Vahvista sähköposti</Button>
        </Paper>
      )}
      <Typography sx={{ marginBottom: '1rem' }}>Käyttäjän {user.name} profiili</Typography>
        <Typography>Sähköposti {user.email}</Typography>
        <ModifyDescriptionForm />
        <Typography sx={{ marginBottom: '1rem', fontSize: '1.3rem',
      borderBottom: '1px solid black', marginTop: '1rem' }}>Navigoi</Typography>
      <Button onClick={() => scrollToSection('openPosts')}>Omat avoimet ilmoitukset</Button>
      <Button component={Link} to='/portaali'>Omat portaali-ilmoitukset</Button>
      <Button onClick={() => scrollToSection('closedPosts')}>Omat suljetut ilmoitukset</Button>
      <Button component={Link} to='/profiili/yhteydenotot'>Yhteydenotot</Button>
        <BuyersPosts />
    </Container>
  )
}

export default PrivateProfile
