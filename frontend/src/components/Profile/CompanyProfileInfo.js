import { Container, Typography } from '@mui/material'
import React from 'react'
import ModifyDescriptionForm from './ModifyDescriptionForm'

const CompanyProfileInfo = ({ user, setUser }) => {

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem',
      justifyContent: 'center', textAlign: 'center', alignItems: 'center'
    }}>
      <Typography>Käyttäjänimi: {user.username}</Typography>
      <Typography>Toimijanimi: {user.name}</Typography>
      <Typography>Esittelysi:</Typography>
      <ModifyDescriptionForm user={user} setUser={setUser}/>
    </Container>
  )
}

export default CompanyProfileInfo