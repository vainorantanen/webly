import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import BuyersPosts from './BuyersPosts'
import ModifyBasicInfo from './ModifyBasicInfo'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import { Link } from 'react-router-dom'

const PrivateProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  const scrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography sx={{ marginBottom: '1rem' }}>Käyttäjän {user.name} profiili</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>Tietoja minusta:</Typography>
        <ModifyBasicInfo />
        <ModifyDescriptionForm />
        <Typography sx={{ marginBottom: '1rem', fontSize: '1.3rem',
      borderBottom: '1px solid black', marginTop: '1rem' }}>Navigoi</Typography>
      <Button onClick={() => scrollToSection('openPosts')}>Omat avoimet ilmoitukset</Button>
      <Button onClick={() => scrollToSection('portalPosts')}>Omat portaali-ilmoitukset</Button>
      <Button onClick={() => scrollToSection('closedPosts')}>Omat suljetut ilmoitukset</Button>
      <Button component={Link} to='/profiili/yhteydenotot'>Yhteydenotot</Button>
        <BuyersPosts />
    </Container>
  )
}

export default PrivateProfile
