import React, { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import ProfileInfo from './ProfileInfo'
import feedbidService from '../../services/feedbids'
import FeedBidCard from '../Feed/FeedBidCard'
import { useSelector, useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'


const CompanyProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  const notify = useNotification()
  const dispatch = useDispatch()

  const userFeedBids = useSelector(({feedBids}) => feedBids).filter(p => p.user.id === user.id)

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Toimijan {user.name} Profiili</Typography>
      <ProfileInfo />
      <Typography>Seuraa tekemiesi tarjousten tilannetta</Typography>
      {userFeedBids.length > 0 ? (userFeedBids.map(m => (
        <Box key={m.id} sx={{ border: '1px solid black', borderRadius: '1rem', marginTop: '1rem' }}>
          <FeedBidCard bid={m}/>
        </Box>
      ))): (
        <Typography>Ei vielä tarjouksia</Typography>
      )}
    </Container>
  )
}

export default CompanyProfile
