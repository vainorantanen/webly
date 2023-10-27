import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import locationsPic from '../../Assets/locations.png'
import remotePic from '../../Assets/remote-choose.png'
import analyzePic from '../../Assets/analyze.png'
import mobileAppPic from '../../Assets/mobileapp.png'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './homebuttons.css'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LoginIcon from '@mui/icons-material/Login';

const HomeProcess = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: '6rem',
      justifyContent: 'center'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
      }}>
        <Box sx={{
          width: '40vw',
          backgroundColor: 'white',
          margin: '0.5rem',
          borderRadius: '0.5rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>1. <span style={{ color: 'blue' }}>Määrittele</span>  tarpeesi</Typography>
          <Typography>Kerro, millaista verkkosivustoa tai projektia olet etsimässä ja mitä ominiasuuksia siihen kuuluu.
             Määrittely antaa raamit projektisi toteuttajalle niiden lajudesta
              sekä mahdollistaa arvion työmäärästä ja hinnasta.</Typography>
              <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              margin: '0.7rem',
              maxWidth: '10rem',
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/ohjeet-maarittelyyn"
            sx={{color: 'white',
              margin: '0.7rem',
              maxWidth: '10rem',
            }}>
            Ohjeet hyvään määrittelyyn <LibraryBooksIcon />
          </Button>
        </Box>
        <Box sx={{ maxWidth: '23rem', height: 'auto',
        '@media (max-width: 510px)': {
          maxWidth: '60vw',
          marginLeft: '2rem'
        }, }}
          component="img"
        src={analyzePic} alt='pic of analyzing'>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
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
        src={mobileAppPic} alt='pic of mobile phone'>
        </Box>
        <Box sx={{
         width: '40vw',
         backgroundColor: 'white',
         margin: '0.5rem',
         borderRadius: '0.5rem',
         padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>2. <span style={{ color: 'blue' }}>Lisää</span> ilmoitus (se on ilmaista)</Typography>
          <Typography>Lisäämällä ilmoituksen tarpeidesi mukaan, tavoitat markkinoiden parhaat tekijät ja parhaat ideat.</Typography>
          <ul>
            <li>
            <Typography>Kirjaudu sisään lisätäksesi ilmoitus ja seurataksesi tarjousten tilannetta.</Typography>
            </li>
            <li>
              <Typography>Voit jättää ilmoituksen missä vain ja milloin vain!</Typography>
            </li>
            <li>
              <Typography>Ilmoituksen jättäminen on ilmaista eikä sido hankintaan!</Typography>
            </li>
            <li>
              <Typography>Ilmoituksen voit jättää joko avoimeksi ilmoitukseksi kaikkien nähtäville tai toimittajaportaaliin.</Typography>
            </li>
          </ul>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/login"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Kirjaudu <LoginIcon />
          </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
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
          width: '40vw',
          backgroundColor: 'white',
          margin: '0.5rem',
          borderRadius: '0.5rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>3. <span style={{ color: 'blue' }}>Valitse</span> paras tekijä</Typography>
          <Typography>Kun tarjouskilpailu on päättynyt, voit valita tarjouksista itsellesi parhaiten sopivan tekijän.
            Siten varmistat, että saat juuri itsellesi parhaat mahdolliset sivut.</Typography>
            <ul>
            <li>
              <Typography>Tavoita yhdellä ilmoituksella useita tekijöitä</Typography>
            </li>
            <li>
              <Typography>Vertaile saamiasi tarjouksia</Typography>
            </li>
          </ul>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              marginTop: '1rem',
              maxWidth: '10rem',
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
        flexWrap: 'wrap-reverse',
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
         width: '40vw',
         backgroundColor: 'white',
         margin: '0.5rem',
         borderRadius: '0.5rem',
         padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Tavoita yhdellä tarjouspyynnöllä useita tekijöitä</Typography>
          <Typography>Sinun tarpeisiisi paras projektin toteuttaja voi sijaita missä päin Suomea tahansa, joten ilmoituksen jättäminen kannattaa. Webly.fi:n avulla
            tavoitat yhdellä kerralla suurimmat nettisivujen ja verkkopohjaisten ohjelmistojen
             toteuttajat sekä pienemmät toimijat, kuten freelancerit, ympäri maan.</Typography>
             <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              marginTop: '1rem',
              maxWidth: '10rem',
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
        </Box>

      </Box>
    </Box>
  )
}

export default HomeProcess