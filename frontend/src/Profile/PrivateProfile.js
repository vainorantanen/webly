import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import CompanyProfileInfo from './CompanyProfileInfo'
import feedpostService from '../services/feedposts'
import FeedPostCard from '../components/Feed/FeedPostCard'
import Togglable from '../components/Togglable'
import ModifyPost from './ModifyPost'
import FeedBidCard from '../components/Feed/FeedBidCard'

const PrivateProfile = ({ user, setUser }) => {
  const [userFeedPosts, setuserFeedPosts] = useState([])

  useEffect(() => {
    const fetchuserFeedPosts = async () => {
      const allFeedPosts = await feedpostService.getAll()
      const userFeedPosts = allFeedPosts.filter(b => b.user.id === user.id)
      setuserFeedPosts(userFeedPosts)
    }
    fetchuserFeedPosts()
  }, [user.id])

  const handleMarkDone = async ({ post }) => {
    const confirmed = window.confirm('Haluatko varmasti merkitä tämän ilmoituksen suljetuksi?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    await feedpostService.update({ ...post, isOpen: false })
  }

  const handleMarkOpen = async ({ post }) => {
    const confirmed = window.confirm('Haluatko varmasti merkitä tämän ilmoituksen avoimeksi?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    await feedpostService.update({ ...post, isOpen: true })
  }

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Käyttäjän {user.name} Profiili</Typography>
      <CompanyProfileInfo user={user} setUser={setUser} />
      <Typography>Seuraa ilmoitustesi tilannetta</Typography>
      {userFeedPosts.map(m => (
        <Box key={m.id} sx={{ marginTop: '1rem', border: '1px solid black', borderRadius: '1rem' }}>
          <FeedPostCard post={m}/>
          <Togglable buttonLabel='Muokkaa ilmoituksen sisältöä'>
            <ModifyPost post={m}/>
          </Togglable>
          {m.isOpen ? (
            <Button
              onClick={() => handleMarkDone({ post: m })}
            >
            Merkitse ilmoitus suljetuksi
            </Button>
          ): (
            <Button
              onClick={() => handleMarkOpen({ post: m })}
            >
            Merkitse ilmoitus avoimeksi
            </Button>
          )}
          {m.feedBids.map(b => (
            <Box key={b.id}>
              <FeedBidCard bid={b}/>
              <Button>
                Hyväksy tarjous
              </Button>
              <Button>
                Hylkää tarjous
              </Button>
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  )
}

export default PrivateProfile
