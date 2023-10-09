import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import FeedItems from './FeedItems'
import developerPic from '../../Assets/developer.png'

const CompaniesList = () => {
  return (
    <Container sx={{ marginTop: '5rem', minHeight: '100vh' }}>
      <Typography
        sx={{
          fontSize: '2rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.4rem',
          },
        }}
      >
        Kehittäjät
      </Typography>

        <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '3rem',
          '@media (max-width: 442px)': {
            fontSize: '1.1rem',
          },
        }}
      >
        Tutustu alustalla toimiviin kehittäjiin.
        <br></br>Selaa yrityksiä, freelancereitä ja muita kehittäjiä.
      </Typography>
        </Box>
        <Box sx={{ maxWidth: '23rem', height: 'auto',
        marginBottom: '1.3rem',
        '@media (max-width: 510px)': {
          maxWidth: '60vw',
        }, }}
          component="img"
        src={developerPic} alt='developer'>
        </Box>
      </Box>
      <FeedItems />
    </Container>
  )
}

export default CompaniesList
