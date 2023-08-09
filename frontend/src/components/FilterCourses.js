import React from 'react'
import { Box, TextField, Container } from '@mui/material'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <Container
      sx={{ marginTop: '5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', }}
    >
      <Box
        sx={{
          marginBottom: '2rem',
          textAlign: 'center',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        <TextField
          type="text"
          placeholder="Search"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
          sx={{
            marginBottom: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </Box>
    </Container>
  )
}

export default Filter
