import React from 'react'
import { Typography, Box } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Box sx={{
        textAlign: 'center',
        padding: '1rem',
        lineHeight: '3rem',
        color: 'black',
        marginTop: '1.5rem',
        borderTop: '1px solid gray'
      }}>

        <Typography variant="body1" className="copyright">
          Webly.fi
        </Typography>

        <Typography variant="body1" className="address" sx={{
          fontSize: '1rem',
        }}>
          Tampere
        </Typography>

        <Typography variant="body1" className="contact" sx={{
          fontSize: '1rem',
        }}>
          +358 505517322
        </Typography>

        <Typography variant="body1" className="contact" sx={{
          fontSize: '1rem',
        }}>
          webline@webline.fi
        </Typography>

        <Typography variant='body1' component={Link} to='/kayttoehdot'
        sx={{ color: 'black' }}
        >
          Käyttöehdot
        </Typography>

        <Box sx={{
          marginTop: '1rem',
        }}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={{
              marginRight: '10px',
              fontSize: '2rem',
              color: 'black',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'rgb(87, 86, 86)',
              },
            }} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon sx={{
              marginRight: '10px',
              fontSize: '2rem',
              color: 'black',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'rgb(87, 86, 86)',
              },
            }} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{
              marginRight: '10px',
              fontSize: '2rem',
              color: 'black',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'rgb(87, 86, 86)',
              },
            }} />
          </a>
        </Box>
        <Typography variant="body1" className="copyright" style={{ fontStyle: 'italic' }}>
          Powered by <span><a href="https://webline.fi" target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>Webline Software Oy</a></span>
        </Typography>

      </Box>
    </footer>
  )
}

export default Footer