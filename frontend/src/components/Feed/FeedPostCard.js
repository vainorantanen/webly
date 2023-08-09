import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const FeedPostCard = ({ post }) => {

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '2rem',
        border: '1px solid black',
        borderRadius: '1rem',
        marginLeft: '5rem',
        marginRight: '5rem',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          {post.isOpen ? (
            <Typography>Avoinna oleva ilmoitus</Typography>
          ) : (
            <Typography>Ilmoitus suljettu</Typography>
          )}
          <Typography>{post.user.name}</Typography>
          {post.timeStamp ? (
            <Typography>Julkaistu {post.timeStamp.split('T')[0]}</Typography>
          ) : (
            <Typography>Julkaistu yli vuosi sitten</Typography>
          )}
        </div>
      </Box>

      {/* Displaying answers */}
      <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography>Sivujen määrä: {post.question1}</Typography>
        <Typography>Pääasiallinen tarkoitus: {post.question2}</Typography>
        <Typography>Ominaisuudet: {post.question3}</Typography>
      </Box>
      <Typography style={{ whiteSpace: 'break-spaces' }}>{post.description}</Typography>
      <Button
        component={Link}
        to={`/tarjouskilpailut/${post.id}`}
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          transition: 'transform 0.3s',
          marginTop: '1rem',
          maxWidth: '9rem',
          marginBottom: '1rem',
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
