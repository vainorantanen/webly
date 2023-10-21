import { Box, Typography, Container, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { removeFeedPost, updateFeedPost } from '../../reducers/feedPosts'
import { removePortalpost, updatePortalpost } from '../../reducers/portalPosts'
import FeedPostCard from '../Feed/FeedPostCard'
import PortalPostCard from '../Portal/PortalPostCard'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

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
      const result = await dispatch(removeFeedPost({ id: postId }))
      if (result && result.error) {
        notify(result.error.response.data.error, 'error')
        return
      } else {
        notify('Poistettu onnistuneesti', 'success')
      }
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
      const result = await dispatch(removePortalpost({ id: postId }))
      if (result && result.error) {
        notify(result.error.response.data.error, 'error')
        return
      } else {
        notify('Poistettu onnistuneesti', 'success')
      } 
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
        <Typography
        id='openPosts'
        sx={{ marginBottom: '1rem', fontSize: '1.3rem',
      borderBottom: '1px solid black' }}>Omat avoimet ilmoitukset ({userPosts.filter(p => p.isOpen).length})</Typography>
        <Box>
        {userPosts.filter(p => p.isOpen).length > 0 ? userPosts.filter(p => p.isOpen).map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white',
            borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid black'}}>
                <FeedPostCard post={p}/>
                <Box sx={{ textAlign: 'center' }}>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä<EditIcon /></Button>
                <Button component={Link} to={`/tarjouskilpailut/${p.id}`}>Siirry ilmoitukseen<ArrowForwardIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenFeedPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}<ChangeCircleIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteFeedPost(p.id)}>Poista ilmoitus<DeleteIcon /></Button>
                  </Box>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography sx={{ marginBottom: '1rem', fontSize: '1.3rem',
      borderBottom: '1px solid black' }}
      id="portalPosts"
      >Omat portaali-ilmoitukset ({userPortalPosts.length})</Typography>
        <Box>
        {userPortalPosts.length > 0 ? userPortalPosts.map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid black'}}>
                <PortalPostCard post={p}/>
                <Box sx={{ textAlign: 'center' }}>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/portaaliilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä<EditIcon/></Button>
                <Button component={Link} to={`/portaali/ilmoitukset/${p.id}`}>Siirry ilmoitukseen<ArrowForwardIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenPortalPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}<ChangeCircleIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeletePortalPost(p.id)}>Poista ilmoitus<DeleteIcon /></Button>
                  </Box>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
        <Typography
        id='closedPosts'
        sx={{ marginBottom: '1rem', fontSize: '1.3rem',
      borderBottom: '1px solid black' }}>Omat suljetut ilmoitukset ({userPosts.filter(p => !p.isOpen).length})</Typography>
        <Box>
        {userPosts.filter(p => !p.isOpen).length > 0 ? userPosts.filter(p => !p.isOpen).map(p => (
            <Box key={p.id} sx={{ backgroundColor: 'white', color: 'black', padding: '0.5rem',
            borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid black'}}>
                <FeedPostCard post={p}/>
                <Box sx={{ textAlign: 'center' }}>
                <Button component={Link} to={`/profiili/kayttaja/muokkaa/ilmoitus/${p.id}`} >Muokkaa ilmoituksen sisältöä<EditIcon /></Button>
                <Button component={Link} to={`/tarjouskilpailut/${p.id}`}>Siirry ilmoitukseen<ArrowForwardIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleCloseOrOpenFeedPost(p)}>{p.isOpen ? 'Aseta ilmoitus suljetuksi'
                : 'Aseta ilmoitus avoimeksi'}<ChangeCircleIcon /></Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteFeedPost(p.id)}>Poista ilmoitus<DeleteIcon /></Button>
                  </Box>
            </Box>  
        )) : (
            <Typography>Ei vielä ilmoituksia</Typography>
        )}
        </Box>
    </Box>
  )
}

export default BuyersPosts