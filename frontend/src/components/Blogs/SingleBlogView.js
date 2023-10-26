import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { formatDate } from '../../Functions/formatDate'

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
      <Typography>Blogin kirjoittaja: <Button
      LinkComponent={Link} to={`/kehittajat/${blog.user.id}`}
      >{blog.user.name}</Button></Typography>
      <Typography>Julkaistu {formatDate(blog.timeStamp)}</Typography>
    </Container>
  )
}

export default SingleBlogView