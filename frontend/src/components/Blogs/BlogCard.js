import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
  return (
    <Box component={Link}
    to={`/blogit/${blog.id}`}
  sx={{
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    color: 'black',
    display: 'flex',
    width: '20rem',
    height: '12rem',
    transition: 'all 0.3s linear',
    flexDirection: 'column',
    '@media (max-width: 400px)': {
        width: '80vw'
    },
    '&:hover': {
        backgroundColor: '#DDDDDD',
        boxShadow: '0rem 0.1rem 0.3rem gray'
    },
  }}>
        <Typography sx={{ fontSize: '1.3rem' }}>
            {blog.title}
        </Typography>
        <Typography sx={{
            borderBottom: '1px solid black'
        }}>{blog.user.name}, {blog.timeStamp.split('T')[0]}</Typography>
        <Typography sx={{
            marginTop: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'break-spaces',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.4',
        }}>{blog.description}</Typography>
    </Box>
  )
}

export default BlogCard