import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'

const AllBlogsList = () => {

    const allBlogs = useSelector(({blogs}) => blogs)
    const user = useSelector(({user}) => user)

    if (!allBlogs) {
        console.log('no blogs')
        return null
    }

  return (
    <Container sx={{ marginTop: '6rem', minHeight: '80vh' }}>
        <Typography sx={{ fontSize: '1.5rem',
    textAlign: 'center', marginBottom: '1rem' }}>Selaa alustan blogeja</Typography>
        {user && user.userType !== 'regular' && (
            <Button component={Link} to='/lisaa-blogi'>Lisää blogi</Button>
        )}
        <Box sx={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            justifyContent: 'center', gap: '1rem'
        }}>
        {allBlogs.length > 0 ? (
            allBlogs.map(b => (
                <Box key={b.id}>
                    <BlogCard blog={b}/>
                </Box>
            ))
        ) : (
            <Typography>Ei vielä blogeja</Typography>
        )}
        </Box>
    </Container>
  )
}

export default AllBlogsList