import { Typography, Box, Container, Button,} from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EuroIcon from '@mui/icons-material/Euro';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SingleDevPostView = () => {

    const { id } = useParams()

    const devPost = useSelector(({devsPosts}) => devsPosts).find(p => p.id === id)

    if (!devPost) {
        return null
    } 

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
            <Box
      sx={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: 'black',
        marginLeft: '3rem',
        marginRight: '3rem',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
      }}
    >
      <Typography sx={{ fontSize: '1.2rem', marginBottom: '0.5rem',
    borderBottom: '1px solid black' }}>{devPost.title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', padding: '0.3rem', borderRadius: '0.3rem',
      backgroundColor: 'white', boxShadow: '0rem 0.1rem 0.3rem gray' }}>
          <Box>
          <Typography><Button component={Link} to={`/kehittajat/${devPost.user.id}`}>{devPost.user.name}</Button></Typography>
          {devPost.timeStamp ? (
            <Typography>Julkaistu {devPost.timeStamp.split('T')[0]}</Typography>
          ) : (
            <Typography>Julkaistu yli vuosi sitten</Typography>
          )}
          </Box>
          <Box>
          <Typography><EuroIcon />{devPost.price}</Typography>
          {devPost.time && devPost.location &&
          (
            <Box>
              <Typography><AccessTimeIcon />{devPost.time}</Typography>
          <Typography><AccessTimeIcon />{devPost.location}</Typography>
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
         }}>{devPost.description}</Typography>
      </Box>
      </Box>
    </Container>
  )
}

export default SingleDevPostView