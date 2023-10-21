import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginSuggestion from '../../LoginSuggestion'
import BlogCard from '../../Blogs/BlogCard'
import { useNotification } from '../../../hooks'
import { removeBlog } from '../../../reducers/blogs'
import { Link } from 'react-router-dom'

const ProfileBlogs = () => {

    const user = useSelector(({user}) => user)
    const devBlogs = useSelector(({blogs}) => blogs).filter(b => b.user.id === user.id)

    const dispatch = useDispatch()
    const notify = useNotification()

    const handleDeleteBlog = async (blog) => {
        const confirmed = window.confirm(`Poistetaanko blogi?`)
      if (!confirmed) {
        return // If the user clicks "Cancel," do nothing
      }

        try {
            const result = await dispatch(removeBlog(blog))
            if (result && result.error) {
                notify('Tapahtui virhe palvelimella', 'error')
                return
              } else {
                notify('Blogi poistettu onnistuneesti', 'success')
                }
        } catch (error) {
          notify('Ilmeni jokin ongelma, yritä myöhemmin uudelleen', 'error')
        }
    }
    
    if (!user) {
        return (
            <LoginSuggestion />
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography>Omat blogisi</Typography>
        <Box sx={{ marginTop: '1rem',
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', background: 'white'}}>
        {devBlogs && devBlogs.length > 0 ? (
          devBlogs.map(b => (
            <Box key={b.id} sx={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.3rem' }}>
              <BlogCard blog={b} />
                <Button component={Link} to={`/profiili/kehittaja/muokkaa/blogi/${b.id}`}>Muokkaa</Button>
                <Button sx={{ color: 'red' }} onClick={() => handleDeleteBlog(b)}>Poista</Button>
            </Box>
          ))
        ): <Typography>Ei blogeja</Typography>}
      </Box>
    </Container>
  )
}

export default ProfileBlogs