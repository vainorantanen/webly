import React from 'react'
import CompanyProfile from './CompanyProfile'
import PrivateProfile from './PrivateProfile'
import { Container } from '@mui/material'

const Profile = ({ user, setUser }) => {

  if (!user) {
    return null
  }

  if (user.isCompany === true) {
    return (
      <Container>
        <CompanyProfile user={user} setUser={setUser}/>
      </Container>
    )
  }

  return (
    <Container>
      <PrivateProfile user={user} setUser={setUser}/>
    </Container>
  )
}

export default Profile