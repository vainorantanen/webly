import { Container, Typography } from '@mui/material'
import React from 'react'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import { useSelector } from 'react-redux'

const ProfileInfo = () => {

  const user = useSelector(({user}) => user)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', marginTop: '1rem',
      justifyContent: 'center', textAlign: 'center', alignItems: 'center'
    }}>
      <Typography>Käyttäjänimi: {user.username}</Typography>
      <Typography>Julkinen nimi: {user.name}</Typography>
      <Typography>Sähköposti: {user.email}</Typography>
      <Typography>Tietoa minusta</Typography>
      <ModifyDescriptionForm />
    </Container>
  )
}

export default ProfileInfo