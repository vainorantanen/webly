import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import locationsPic from '../../Assets/locations.png'
import seoPic from '../../Assets/seo.png'
import statisticsPic from '../../Assets/statistics.png'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import devPic from '../../Assets/developer.png'
import './homebuttons.css'
import EuroIcon from '@mui/icons-material/Euro';
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>1. <span style={{ color: 'blue' }}>Luo</span> kehittäjäprofiili</Typography>
          <Typography>Olit sitten yritys, toiminimi, freelancer tai muu web-kehittäjä,
             luomalla profiilin pystyt tarjoamaan asiakkaiden ilmoituksiin ja luomaan brändiäsi
             erottumalla kilpailijoista.
          </Typography>
          <ul>
            <li>
              <Typography>Hanki uusia asiakkaita vaivattomasti päivittäin!</Typography>
            </li>
          </ul>
              <Button className="bn632-hover bn26"
            component={Link}
            to="/login"
            sx={{color: 'white',
              margin: '0.7rem',
              maxWidth: '10rem',
            }}>
            Kirjaudu <LoginIcon />
          </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/kehittajille"
            sx={{color: 'white',
              margin: '0.7rem',
              maxWidth: '10rem',
            }}>
            Lue lisää <LibraryBooksIcon />
          </Button>
        </Box>
        <Box sx={{ maxWidth: '23rem', height: 'auto',
        '@media (max-width: 510px)': {
          maxWidth: '60vw',
          marginLeft: '2rem'
        }, }}
          component="img"
        src={devPic} alt='developer'>
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
        src={seoPic} alt='seo'>
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>2. <span style={{ color: 'blue' }}>Tarjoa</span> ilmoituksiin tai
          <span style={{ color: 'blue' }}> Lisää</span> oma ilmoitus</Typography>
          <Typography>Kehittäjänä voi tarjota asiakkaiden tarjouspyyntöihin ja luoda omia ilmoituksiasi asiakkiden nähtäville.</Typography>
          <ul>
            <li>
              <Typography>Voit jättää ilmoituksen ja tarjouksen missä vain ja milloin vain!</Typography>
            </li>
            <li>
              <Typography>Avoimet ilmoitukset ja tarjoukset ovat kaikkien nähtävillä. Tarjoamme 
                tämän lisäksi portaalin, jossa vain sinä ja asiakas näette tarjouksenne.
              </Typography>
            </li>
          </ul>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
            </Button>
            <Button className="bn632-hover bn26"
            component={Link}
            to="/kehittajille"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Lue lisää <LibraryBooksIcon />
            </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/hinnasto"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Hinnasto <EuroIcon />
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>3. <span style={{ color: 'blue' }}>Toteuta</span> projekteja</Typography>
          <Typography>Skaalaa liiketoimintasi uudelle tasolle asiakasprojektien avulla.
            Voit toteuttaa projektisi täysin riippumatta Webly.fi:stä</Typography>
            <ul>
            <li>
              <Typography>Seuraa kuinka asiakasportfoliosi kasvaa</Typography>
            </li>
            <li>
              <Typography>Valitse juuri sopivat asiakkaat</Typography>
            </li>
          </ul>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/tarjouskilpailut"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Avoimet ilmoitukset <ArrowForwardIcon />
          </Button>
        </Box>
        <Box sx={{ maxWidth: '20rem',
        '@media (max-width: 442px)': {
          maxWidth: '40vw',
        }, }}
          component="img"
        src={statisticsPic} alt='statistics'>
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
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Kirjoita blogeja ja kerro asiakastarinoitasi</Typography>
          <Typography>Webly.fi tarjoaa alustan kehittäjille, jossa voit ylläpitää omaa blogiasi ja esitellä asiakastarinoita.
             Aktiivisuus rakentaa brändiäsi ja luo luottamusta asiakasnäkökulmasta!
          </Typography>
             <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
            margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Jätä ilmoitus <ArrowForwardIcon />
          </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaa-blogi"
            sx={{color: 'white',
              margin: '0.5rem',
              maxWidth: '10rem',
            }}>
            Lisää blogi <ArrowForwardIcon />
          </Button>
        </Box>

      </Box>
    </Box>
  )
}

export default HomeProcess