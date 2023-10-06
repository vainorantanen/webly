import React from 'react'
import CompanyProfile from './CompanyProfile'
import PrivateProfile from './PrivateProfile'
import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import LoginSuggestion from '../LoginSuggestion'

const Profile = () => {

  const user = useSelector(({ user }) => user)

  if (!user) {
    return (
      <LoginSuggestion />
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