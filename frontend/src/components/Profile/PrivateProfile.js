import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import FeedPostCard from '../Feed/FeedPostCard'
import Togglable from '../Togglable'
import ModifyPost from './ModifyPost'
import FeedBidCard from '../Feed/FeedBidCard'
import { useSelector, useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import { updateFeedPost } from '../../reducers/feedPosts'
import ProfileInfo from './ProfileInfo'

const PrivateProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  const notify = useNotification()
  const dispatch = useDispatch()
  const userFeedPosts = useSelector(({ feedPosts }) => feedPosts).filter(p => p.user.id === user.id)

  const handleMarkDone = async ({ post }) => {
    const confirmed = window.confirm('Haluatko varmasti merkitä tämän ilmoituksen suljetuksi?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(updateFeedPost({ ...post, isOpen: false }))
      notify('Päivitetty onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  
  }

  const handleMarkOpen = async ({ post }) => {
    const confirmed = window.confirm('Haluatko varmasti merkitä tämän ilmoituksen avoimeksi?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(updateFeedPost({ ...post, isOpen: true }))
      notify('Päivitetty onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  }

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '100vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Käyttäjän {user.name} Profiili</Typography>
      <ProfileInfo />
      <Typography>Seuraa ilmoitustesi tilannetta</Typography>
      {userFeedPosts.length > 0 ? userFeedPosts.map(m => (
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
      )): (
        <Typography>Ei vielä julkaisuja</Typography>
      )}
    </Container>
  )
}

export default PrivateProfile
