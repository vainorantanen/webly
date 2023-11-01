import React from 'react'
import { Container, Typography, Button } from '@mui/material'
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
    <Container sx={{ marginTop: '7rem', minHeight: '50vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Toimijan {user.name} Profiili</Typography>
      <Typography>Sähköposti {user.email}. Onko sähköpostisi vahvistamatta? <Button
        component={Link} to='/laheta-uusi-vahvistus'>
          Vahvista</Button></Typography>
      <ModifyDescriptionForm />
      <Button component={Link}
      to='/lisaa-blogi'
      >Lisää blogi</Button>
      <Button component={Link} to='/profiili/yhteydenotot'>Yhteydenotot</Button>
      <Button component={Link} to='/profiili/kehittaja/omat-ilmoitukset'>Omat ilmoitukset</Button>
      <Button component={Link} to='/profiili/kehittaja/omat-blogit'>Omat blogit</Button>
      <Typography sx={{ fontSize: '1.2rem', borderBottom: '1px solid black' }}>Seuraa tekemiesi tarjousten tilannetta</Typography>
      <Button component={Link} to='/profiili/kehittaja/hyvaksytyt-tarjoukset'>Katso kaikki hyväksytyt tarjoukset</Button>
      <DevBids />
    </Container>
  )
}

export default CompanyProfile
