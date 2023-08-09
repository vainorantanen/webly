import React from 'react'
import Company from './Company'
import { Box, Container, Typography } from '@mui/material'

const CompaniesList = ({ users }) => {
  return (
    <Container sx={{ marginTop: '8rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.4rem',
          },
        }}
      >
        Yritykset
      </Typography>

      <Typography
        sx={{
          fontSize: '1.6rem',
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '3rem',
          '@media (max-width: 442px)': {
            fontSize: '1.1rem',
          },
        }}
      >
        Tutustu yrityksiin, jotka aktiivisesti osallistuvat tarjouskilpailuihin
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'flex-start',
          gap: '1rem',
          marginBottom: '1rem',
          borderRadius: '1rem',
        }}
      >
        {users.filter((user) => user.isCompany).map((u) => (
          <Company key={u.id} company={u} />
        ))}
      </Box>
    </Container>
  )
}

export default CompaniesList
