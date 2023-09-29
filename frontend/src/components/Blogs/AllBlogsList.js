import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const AllBlogsList = () => {

    const allBlogs = useSelector(({blogs}) => blogs)

    if (!allBlogs) {
        console.log('no blogs')
        return null
    }

  return (
    <Container sx={{ marginTop: '6rem', minHeight: '80vh' }}>
        <Typography>Selaa alustan blogeja</Typography>
        {allBlogs.length > 0 ? (
            allBlogs.map(b => (
                <Box key={b.id}>
                    <Typography>{b.title}</Typography>
                    <Typography>{b.description}</Typography>
                </Box>
            ))
        ) : (
            <Typography>Ei vielä blogeja</Typography>
        )}
    </Container>
  )
}

export default AllBlogsList