import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import devicesPic from '../../Assets/devices.png'
import laptopPic from '../../Assets/laptop.png'
import locationsPic from '../../Assets/locations.png'
import remotePic from '../../Assets/remote-choose.png'
import phonePic from '../../Assets/phone.png'
import analyzePic from '../../Assets/analyze.png'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const HomeProcess = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: '6rem'
    }}>
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>1. <span style={{ color: 'blue' }}>Määrittele</span>  tarpeesi</Typography>
          <Typography>Kerro millaista verkkosivustoa tai projektia olet etsimässä ja mitä ominiasuuksia siihen kuuluu.
             Määrittely antaa raamit projektisi toteuttajalle niiden lajudesta
              sekä mahdollistaa arvion työmäärästä ja hinnasta.</Typography>          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
          <Button>Ohjeet hyvään määrittelyyn</Button>
        </Box>
        <Box sx={{ maxWidth: '23rem', height: 'auto',
        '@media (max-width: 510px)': {
          maxWidth: '60vw',
        }, }}
          component="img"
        src={analyzePic} alt='pic of analyzing'>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{ maxWidth: '20rem',
        '@media (max-width: 442px)': {
          maxWidth: '40vw',
        }, }}
          component="img"
        src={phonePic} alt='pic of mobile phone'>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '40vw',
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>2. <span style={{ color: 'blue' }}>Lisää</span> ilmoitus</Typography>
          <Typography>Lisäämällä ilmoituksen tarpeidesi mukaan, tavoitat markkinoiden parhaat tekijät ja parhaat ideat.</Typography>
          <ul>
            <li>
              <Typography>Tavoita yhdellä ilmoituksella useita tekijöitä</Typography>
            </li>
            <li>
              <Typography>Vertaile saamiasi tarjouksia</Typography>
            </li>
            <li>
              <Typography>Ilmoituksen jättäminen on ilmaista eikä sido hankintaan!</Typography>
            </li>
          </ul>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>


      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem',
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>3. <span style={{ color: 'blue' }}>Valitse</span> paras tekijä</Typography>
          <Typography>Kun tarjouskilpailu on päättynyt, voit valita tarjouksista itsellesi parhaiten sopivan tekijän.
            Siten varmistat, että saat juuri itsellesi parhaat mahdolliset sivut.</Typography>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>
        <Box sx={{ maxWidth: '20rem',
        '@media (max-width: 442px)': {
          maxWidth: '40vw',
        }, }}
          component="img"
        src={remotePic} alt='remote workers'>
        </Box>

      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem',
      }}>
        <Box sx={{ maxWidth: '20rem',
        '@media (max-width: 442px)': {
          maxWidth: '40vw',
        }, }}
          component="img"
        src={locationsPic} alt='pic of mobile phone'>
        </Box>
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Tavoita yhdellä tarjouspyynnöllä useita tekijöitä</Typography>
          <Typography>Sinun tarpeisiisi paras projektin toteuttaja voi sijaita missä päin Suomea tahansa, joten ilmoituksen jättäminen kannattaa. Webly.fi:n avulla
            tavoitat yhdellä kerralla suurimmat nettisivujen ja verkkopohjaisten ohjelmistojen
             toteuttajat sekä pienemmät toimijat, kuten freelancerit, ympäri maan.</Typography>
          <Button
            component={Link}
            to="/lisaailmoitus"
            sx={{ backgroundColor: 'blue', color: 'white',
              transition: 'transform 0.3s',
              marginTop: '1rem',
              borderRadius: '1rem',
              maxWidth: '10rem',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>

      </Box>
    </Box>
  )
}

export default HomeProcess