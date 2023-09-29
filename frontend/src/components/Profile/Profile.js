import React from 'react'
import CompanyProfile from './CompanyProfile'
import PrivateProfile from './PrivateProfile'
import { Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector(({ user }) => user)

  if (!user) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', borderRadius: '0.5rem' }}>
          <Typography>Kirjaudu sisään nähdäksesi profiilisi</Typography>
      </Container>
  )
  }

  if (user.userType !== 'regular') {
    return (
      <Container>
        <CompanyProfile />
      </Container>
    )
  }

  return (
    <Container>
      <PrivateProfile />
    </Container>
  )
}

export default Profile