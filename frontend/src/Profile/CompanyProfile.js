import React, { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import CompanyProfileInfo from './CompanyProfileInfo'
import feedbidService from '../services/feedbids'
import FeedBidCard from '../components/Feed/FeedBidCard'

const CompanyProfile = ({ user, setUser }) => {
  const [userFeedBids, setUserFeedBids] = useState([])

  useEffect(() => {
    const fetchUserFeedBids = async () => {
      const allFeedBids = await feedbidService.getAll()
      const userFeedBids = allFeedBids.filter(b => b.user.id === user.id)
      setUserFeedBids(userFeedBids)
    }
    fetchUserFeedBids()
  }, [user.id])

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Toimijan {user.name} Profiili</Typography>
      <CompanyProfileInfo user={user} setUser={setUser} />
      <Typography>Seuraa tekemiesi tarjousten tilannetta</Typography>
      {userFeedBids.map(m => (
        <Box key={m.id} sx={{ border: '1px solid black', borderRadius: '1rem', marginTop: '1rem' }}>
          <FeedBidCard bid={m}/>
        </Box>
      ))}
    </Container>
  )
}

export default CompanyProfile
