import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import ModifyBasicInfo from './ModifyBasicInfo'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import { Link } from 'react-router-dom'
import DevFeedBids from './DevFeedBids'


const CompanyProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '50vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Toimijan {user.name} Profiili</Typography>
      <ModifyBasicInfo />
      <ModifyDescriptionForm />
      <Button component={Link}
      to='/lisaa-blogi'
      >Lisää blogi</Button>
      <Typography>Seuraa tekemiesi tarjousten tilannetta</Typography>
      <DevFeedBids />
    </Container>
  )
}

export default CompanyProfile
