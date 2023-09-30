import React from 'react'
import { Typography, Box, Button,} from '@mui/material'
import { Link } from 'react-router-dom'
import EuroIcon from '@mui/icons-material/Euro';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const FeedPostCard = ({ post }) => {

  return (
    <Box
    component={Link}
        to={`/kehittajien-ilmoitukset/${post.id}`}
      sx={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: 'black',
        marginLeft: '3rem',
        marginRight: '3rem',
        display: 'flex',
        transition: '0.3s ease',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      <Typography sx={{ fontSize: '1.2rem', marginBottom: '0.5rem',
    borderBottom: '1px solid black' }}>{post.title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', padding: '0.3rem', borderRadius: '0.3rem',
      backgroundColor: 'white', boxShadow: '0rem 0.1rem 0.3rem gray' }}>
          <Box>
          <Typography>{post.user.name}</Typography>
          {post.timeStamp ? (
            <Typography>Julkaistu {post.timeStamp.split('T')[0]}</Typography>
          ) : (
            <Typography>Julkaistu yli vuosi sitten</Typography>
          )}
          </Box>
          <Box>
          <Typography><EuroIcon />{post.price}</Typography>
          {post.time && post.location &&
          (
            <Box>
              <Typography><AccessTimeIcon />{post.time}</Typography>
          <Typography><AccessTimeIcon />{post.location}</Typography>
              </Box>
          )}
          </Box>
      </Box>

      {/* Displaying answers */}
      <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem'
       }}>Kuvaus</Typography>
        <Typography style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'break-spaces',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4',
         }}>{post.description}</Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          marginTop: '1rem',
          maxWidth: '9rem',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
          },
        }}
      >
        Tarkastele
      </Button>
    </Box>
  )
}

export default FeedPostCard
