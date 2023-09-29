import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'

const Company = ({ dev }) => {
  return (
    <Box
      component={Link}
      to={`/yritykset/${dev.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Start the content from the top (left-aligned)
        backgroundColor: '#f0f0f0',
        textAlign: 'flex-start',
        textDecoration: 'none',
        color: 'black',
        padding: '2rem',
        boxShadow: '0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.2)',
        width: '70vw',
        borderRadius: '1rem',
        marginBottom: '1rem',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: '0.5rem',
        }}
      >
        {dev.name}
      </Typography>
      <Typography sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'break-spaces',
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4', // Increase line height for better readability
      }}>{dev.description}</Typography>
    </Box>
  )
}

export default Company
