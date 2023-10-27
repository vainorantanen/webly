import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './homeheader.css'
import './homebuttons.css'
import ComputerTab from './ComputerTab'

const HomeHeader = () => {
  return (
    <Box  className='spacer layer1' sx={{ marginTop: '3rem',
borderRadius: '0 0 3rem 3rem'
     }}>
      <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '2.8rem',
              textAlign: 'center',
              color: 'white',
              paddingTop: '6rem',
              marginBottom: '1.5rem',
              '@media (max-width: 750px)': {
                fontSize: '1.4rem',
                paddingTop: '3rem'
              },
            }}
          >
            Paras tapa ostaa ja myydä nettisivuja ja verkkopalveluita.
          </Typography>
          <Typography
          sx={{
            fontSize: '1.2rem',
            textAlign: 'center',
            color: 'white',
          }}>Webly.fi on alusta, joka yhdistää nettisivuja etsivät asiakkaat niitä toteuttaviin kehittäjiin.</Typography>
        <Typography
          sx={{
            fontSize: '1.15rem',
            textAlign: 'center',
            color: 'white',
            marginBottom: '1.5rem',
          }}>Asiakkaana löydät nopeasti ja helposti kehittäjän. Kehittäjänä löydät helposti asiakkaasi.</Typography>
          <Box sx={{ 
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem',
            justifyContent: 'center',
           }}>
            <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              marginTop: '1rem',
              maxWidth: '10rem',
              backgroundColor: '#043aa3',
              transition: '0.3s ease',
              '&:hover': {
                backgroundColor: '#00266f'
              },
            }}>
            Lisää ilmoitus
          </Button>
          <Button
            component={Link}
            to="/tarjouskilpailut"
            sx={{color: 'black',
              marginTop: '1rem',
              backgroundColor: 'white',
              transition: '0.3s ease',
              boxShadow: '0rem 0rem 1rem 0.05rem #c3c3c3',
              '&:hover': {
                backgroundColor: '#dcdcdc'
              },
            }}>
            Avoimet ilmoitukset
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{color: 'black',
              marginTop: '1rem',
              maxWidth: '10rem',
              backgroundColor: 'white',
              transition: '0.3s ease',
              boxShadow: '0rem 0rem 1rem 0.05rem #c3c3c3',
              '&:hover': {
                backgroundColor: '#dcdcdc'
              },
            }}>
            Kirjaudu
          </Button>
          </Box>
          <br></br>
          <ComputerTab />
          <br></br>
      </Box>
  )
}

export default HomeHeader