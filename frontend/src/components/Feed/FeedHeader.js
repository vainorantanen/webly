import { Container, Typography, Button, Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Home/homebuttons.css'
import searchPic from '../../Assets/search.png'

const FeedHeader = () => {
  return (
    <Container sx={{ marginTop: '5rem' }}>
      <Typography
        sx={{
          fontSize: '2rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}
      >Avoimet ilmoitukset</Typography>

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
          width: '44vw',
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
          textAlign: 'left',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >Selaa avoimia ilmoituksia nettisivuista ja muista verkkopohjaisista ohjelmistoprojekteista</Typography>
        <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Lisää ilmoitus
            </Button>
        </Box>
        <Box sx={{ maxWidth: '13rem', height: 'auto',
        marginBottom: '1.3rem',
        '@media (max-width: 510px)': {
          maxWidth: '60vw',
        }, }}
          component="img"
        src={searchPic} alt='search'>
        </Box>
      </Box>
    </Container>
  )
}

export default FeedHeader