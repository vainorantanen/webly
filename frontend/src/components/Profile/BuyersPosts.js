import { Box, Typography, Container, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removeFeedPost, updateFeedPost } from '../../reducers/feedPosts'
import { removePortalpost, updatePortalpost } from '../../reducers/portalPosts'

const BuyersPosts = () => {
    const notify = useNotification()
    const user = useSelector(({user}) => user)
  const dispatch = useDispatch()
    const userPosts = useSelector(({ feedPosts }) => feedPosts).filter(p => p.user.id === user.id)
  const userPortalPosts = useSelector(({ portalPosts }) => portalPosts).filter(p => p.user.id === user.id)

  const handleDeleteFeedPost = async (postId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(removeFeedPost({ id: postId }))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'erro')
    }
  }
  
  const handleDeletePortalPost = async (postId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän ilmoituksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(removePortalpost({ id: postId }))
      notify('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma poistossa', 'erro')
    }
  }

  const handleCloseOrOpenFeedPost = async (post) => {
    const state = post.isOpen ? 'suljettu' : 'avoin'
    const confirmed = window.confirm(`Haluatko varmasti asettaa ilmoituksen tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(updateFeedPost({ ...post, isOpen: !post.isOpen }))
      notify('Tila muokattu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  }

  const handleCloseOrOpenPortalPost = async (post) => {
    const state = post.isOpen ? 'suljettu' : 'avoin'
    const confirmed = window.confirm(`Haluatko varmasti asettaa ilmoituksen tilaan: ${state}?`)
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }

    try {
      dispatch(updatePortalpost({ ...post, isOpen: !post.isOpen }))
      notify('Tila muokattu onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma', 'erro')
    }
  }

  if (!userPosts) {
    return (
      <Container>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Box>
        <Typography sx={{ marginBottom: '2rem' }}>Omat avoimet ilmoitukset</Typography>
        <Box>
        {userPosts.filter(p => p.isOpen).length > 0 ? userPosts.filter(p => p.isOpen).map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid black'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/tarjouskilpailut/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenFeedPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteFeedPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ marginBottom: '2rem' }}>Omat portaali-ilmoitukset</Typography>
        <Box>
        {userPortalPosts.length > 0 ? userPortalPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid black'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/portaaliilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ marginBottom: '2rem' }}>Omat suljetut ilmoitukset</Typography>
        <Box>
        {userPosts.filter(p => !p.isOpen).length > 0 ? userPosts.filter(p => !p.isOpen).map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid black'}}>
                <Typography sx={{ fontSize: '1.3rem' }}>{p.title}</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{p.description}</Typography>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä</Button>
                <Button component={Link} to={`/tarjouskilpailut/${p.id}`}>Siirry ilmoitukseen</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenFeedPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteFeedPost(p.id)}>Poista ilmoitus</Button>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyersPosts