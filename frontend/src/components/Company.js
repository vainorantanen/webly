import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'

const Company = ({ company }) => {
  return (
    <Box
      component={Link}
      to={`/yritykset/${company.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Start the content from the top (left-aligned)
        backgroundColor: '#f0f0f0',
        textAlign: 'flex-start',
        textDecoration: 'none',
        padding: '2rem',
        boxShadow: '0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.2)',
        width: '70vw',
        borderRadius: '1rem',
        marginBottom: '1rem',
        transition: '0.4s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#2c3e50',
          textDecoration: 'none',
          marginBottom: '0.5rem',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {company.name}
      </Typography>
      <Typography sx={{
        color: '#666',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2, // Show only one line of description
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4', // Increase line height for better readability
      }}>{company.description}</Typography>
    </Box>
  )
}

export default Company
