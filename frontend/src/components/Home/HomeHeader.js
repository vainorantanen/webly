import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import mobileAppPic from '../../Assets/mobileapp.png'
import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import './homeheader.css'
import './homebuttons.css'

const HomeHeader = () => {
  return (
    <Box  className='spacer layer1' sx={{ marginTop: '3rem' }}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '3rem',
          color: 'white',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem'
          },
        }}
      >Webly.fi</Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
         paddingBottom: '2rem',
          '@media (max-width: 600px)': {
            width: '80vw',
            justifyContent: 'center'
          },
        }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '2.8rem',
              textAlign: 'center',
              '@media (max-width: 442px)': {
                fontSize: '1.2rem',
              },
            }}
          >
            <Typography 
            component="span"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ffffff, #783EFF)',
              WebkitBackgroundClip: 'text', // Corrected property name
              WebkitTextFillColor: 'transparent', // Corrected property name
              fontSize: '2.8rem',
              '@media (max-width: 442px)': {
                fontSize: '1.4rem',
              },
            }}>Paras</Typography> tapa ostaa ja myydä nettisivuja ja verkkopohjaisia ohjelmistoja.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
              <Timeline sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }}/>
                  </TimelineSeparator>
                  <TimelineContent>1. Määrittele tarpeesi</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }}/>
                  </TimelineSeparator>
                  <TimelineContent>2. Lisää ilmoitus</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                  </TimelineSeparator>
                  <TimelineContent>3. Valitse paras tekijä</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
            <Button className="bn632-hover bn26"
            component={Link}
            to="/lisaailmoitus"
            sx={{color: 'white',
              marginTop: '1rem',
              maxWidth: '10rem',
            }}>
            Aloita tästä
          </Button>
          <Button className="bn632-hover bn26"
            component={Link}
            to="/tarjouskilpailut"
            sx={{color: 'white',
              marginTop: '1rem',
              maxWidth: '10rem',
            }}>
            Avoimet ilmoitukset
          </Button>
          </Box>
        </Box>
        <Box sx={{ maxWidth: '25rem', height: 'auto',
        '@media (max-width: 510px)': {
          maxWidth: '60vw',
        }, }}
          component="img"
        src={mobileAppPic} alt='pic of mobile app'>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeHeader