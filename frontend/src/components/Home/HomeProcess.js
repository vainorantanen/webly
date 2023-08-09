import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import devicesPic from '../../Assets/devices.png'
import laptopPic from '../../Assets/laptop.png'
import locationsPic from '../../Assets/locations.png'
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
          <Typography>Kerro millaiset nettisivut haluat ja mitä ominiasuuksia nettisivujen tulisi sisältää. Määrittely antaa raamit nettisivuejesi toeuttajalle niiden lajudesta sekä mahdollistaa arvion työmäärästä ja hinnasta</Typography>
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
        <Box>
          <img src={devicesPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
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
        <Box>
          <img src={laptopPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
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
          <Typography>Kun tarjouskilpailu on päättynyt voi valita tarjouksista itsellesi parhaiten sopivan tekijän, ja siten varmistat etttä saat juuri itsellesi parhaat mahdolliset sivut.</Typography>
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
        <Box>
          <img src={devicesPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
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
        <Box>
          <img src={locationsPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Tavoita yhdellä tarjouspyynnöllä satoja tekijöitä</Typography>
          <Typography>Sinun tarpeisiisi paras projektin toteuttaja voi sijaita missä päin Suomea tahansa, joten ilmoituksen jättäminen kannattaa. Nettisivutorin avulla
            tavoitat yhdellä kerralla kaikki suurimmat nettisivujen ja Web-projektien toteuttajat, sekä sadat keskisuuret ja pienet toimijat ympäri maan.</Typography>
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