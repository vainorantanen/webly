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

const HomeHeader = () => {
  return (
    <Box sx={{ marginTop: '6rem' }}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem'
          },
        }}
      >Tervetuoloa Nettisivutoriin!</Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          '@media (max-width: 600px)': {
            width: '80vw',
          },
        }}>
          <Typography
            sx={{
              fontSize: '1.7rem',
              textAlign: 'center',
              '@media (max-width: 442px)': {
                fontSize: '1rem',
              },
            }}
          ><span style={{ color: 'blue' }}>Paras</span> tapa toteuttaa omat nettisivut ja Web-projektit.</Typography>
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
            <Button
              component={Link}
              to="/lisaailmoitus"
              sx={{ backgroundColor: 'blue', color: 'white',
                transition: 'transform 0.3s',
                maxWidth: '9rem',
                marginTop: '1rem',
                marginLeft: '1rem',
                marginBottom: '1rem',
                borderRadius: '1rem',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
              }}>
            Aloita tästä
            </Button>
            <Button
              component={Link}
              to="/tarjouskilpailut"
              sx={{
                backgroundColor: 'blue',
                color: 'white',
                transition: 'transform 0.3s',
                marginTop: '1rem',
                marginBottom: '1rem',
                maxWidth: '9rem',
                marginLeft: '1rem',
                borderRadius: '1rem',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
                },
              }}
            >
  Avoimet ilmoitukset
            </Button>
          </Box>
        </Box>
        <Box>
          <img src={mobileAppPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeHeader