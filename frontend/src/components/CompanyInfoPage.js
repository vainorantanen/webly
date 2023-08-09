import { Container, Typography, Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

const CompanyInfoPage = ({ users }) => {
  const id = useParams().id
  const company = users.find((c) => c.id === id)

  if (!company) {
    return null
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        minHeight: '100vh',
        backgroundColor: '#fff', // White background
        padding: '2rem',
        boxShadow: '0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.2)',
        borderRadius: '1rem',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}
      >
        {company.name}
      </Typography>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: '2rem', fontWeight: 'bold' }}>
          Tietoa yrityksestä
        </Typography>
        <Typography style={{ whiteSpace: 'break-spaces' }}>{company.description}</Typography>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          Yhteystiedot
        </Typography>
        <Typography>
          Sähköposti: {company.email || 'Ei saatavilla'}
          <br />
          Puhelin: {company.phone || 'Ei saatavilla'}
          <br />
          Osoite: {company.address || 'Ei saatavilla'}
          <br />
          Kotisivut: {company.url || 'Ei saatavilla'}
        </Typography>
      </Box>
      {/* Add more information as needed */}
    </Container>
  )
}

export default CompanyInfoPage
