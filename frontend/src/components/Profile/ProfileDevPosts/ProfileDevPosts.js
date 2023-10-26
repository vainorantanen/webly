import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginSuggestion from '../../LoginSuggestion'
import { Link } from 'react-router-dom'
import { useNotification } from '../../../hooks'
import { removeDevPost } from '../../../reducers/devsPosts'

const ProfileDevPosts = () => {

    const user = useSelector(({user}) => user)
    const userDevPosts = useSelector(({devsPosts}) => devsPosts).filter(p => p.user.id === user.id)

    const notify = useNotification()
  
    const dispatch = useDispatch()

    if (!user || user.userType === 'regular') {
        return (
            <Container>
                <LoginSuggestion />
            </Container>
        )
    }

    const handleDevPostDelete = async (devPost) => {
        const confirmed = window.confirm(`Poistetaanko ilmoitus?`)
      if (!confirmed) {
        return // If the user clicks "Cancel," do nothing
      }
        try {
            const result = await dispatch(removeDevPost(devPost))
              if (result && result.error) {
                notify('Tapahtui virhe backendissa', 'error')
                return
              } else {
                notify('Poistettu onnistuneesti', 'success')
                }
          } catch (error) {
            notify('Ilmeni jokin ongelma, yritä myöhemmin uudelleen', 'error')
          }
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography>Omat ilmoitukset</Typography>
        {userDevPosts && userDevPosts.length > 0 ? (
            userDevPosts.map(p => (
                <Box key={p.id} sx={{ 
                    marginTop: '1rem', backgroundColor: 'lightgray', padding: '0.5rem', borderRadius: '0.5rem'
                 }}>
                    <Typography>{p.title}</Typography>
                    <Typography>Tyyppi: {p.postType}</Typography>
                    <Button component={Link}
                    to={`/profiili/kehittaja/muokkaa/ilmoitus/${p.id}`}>Muokkaa</Button>
                    <Button onClick={() => handleDevPostDelete(p)} sx={{
                        color: 'red'
                    }}>Poista ilmoitus</Button>
                </Box>
            ))
        ) : (
            <Typography>Ei ilmoituksia</Typography>
        )}
    </Container>
  )
}

export default ProfileDevPosts