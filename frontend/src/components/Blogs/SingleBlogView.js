import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleBlogView = () => {

  const { id } = useParams()

  const blog = useSelector(({blogs}) => blogs).find(b => b.id === id)

  if (!blog) {
    return null
  }

  return (
    <Container sx={{ minHeight: '80vh', marginTop: '5rem', display: 'flex',
    flexDirection: 'column', justifyContent: 'flex-start' }}>
      <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>{blog.title}</Typography>
      <Typography sx={{
        whiteSpace: 'break-spaces',
        marginTop: '2rem', marginBottom: '2rem', paddingBottom: '1rem',
        borderBottom: '1px solid black'
      }}>{blog.description}</Typography>
      <Typography>Blogin kirjoittaja: {blog.user.name}</Typography>
      <Typography>Julkaistu {blog.timeStamp.split('T')[0].split('-').reverse().join('.')}</Typography>
    </Container>
  )
}

export default SingleBlogView