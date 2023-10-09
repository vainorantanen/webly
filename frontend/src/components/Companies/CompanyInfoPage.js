import { Container, Typography, Box, Button, Rating } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import BlogCard from '../Blogs/BlogCard'

const CompanyInfoPage = () => {
  const [ratingDescriptions, setRatingDescriptions] = useState([]);
  
  const toggleDescription = (index) => {
    const newDescriptions = [...ratingDescriptions];
    newDescriptions[index] = !newDescriptions[index];
    setRatingDescriptions(newDescriptions);
  };


  const id = useParams().id

  const user = useSelector(({user}) => user)
  const dev = useSelector(({ users }) => users.find(p => p.id === id))
  const devRatings = useSelector(({ratings}) => ratings).filter(r => r.targetUser.id === dev.id)
  const devBlogs = useSelector(({blogs}) => blogs).filter(b => b.user.id === dev.id)

  if (!dev) {
    return (
      <Container sx={{ minHeight: '90vh', marginTop: '5rem', backgroundColor: '#393939', borderRadius: '0.5rem' }}>
        <Typography>Ladataan...</Typography>
      </Container>
    )
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '5rem',
        minHeight: '70vh',
        backgroundColor: '#f0f0f0',
        boxShadow: '0.3rem 0.3rem 0.5rem rgba(0, 0, 0, 0.2)',
        borderRadius: '0.5rem',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}
      >
        {dev.name}
      </Typography>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: '2rem', fontWeight: 'bold' }}>
          Tietoa kehittäjästä
        </Typography>
        <Typography style={{ whiteSpace: 'break-spaces' }}>{dev.description}</Typography>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          Yhteystiedot
        </Typography>
        <Typography>
          Sähköposti: {dev.email || 'Ei saatavilla'}
          <br />
          Puhelin: {dev.phone || 'Ei saatavilla'}
          <br />
          Osoite: {dev.address || 'Ei saatavilla'}
          <br />
          Kotisivut: {dev.url || 'Ei saatavilla'}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '1.3rem', borderBottom: '1px solid black',
      marginTop: '1rem' }}>Kehittäjän blogit</Typography>
      <Box sx={{ marginTop: '1rem',
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', background: 'white'}}>
        {devBlogs && devBlogs.length > 0 ? (
          devBlogs.map(b => (
            <Box key={b.id} sx={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.3rem',
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            justifyContent: 'flex-start', gap: '1rem' }}>
              <BlogCard blog={b} />
              </Box>
          ))
        ): <Typography>Ei blogeja</Typography>}
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
            <Typography sx={{ fontSize: '1.3rem', borderBottom: '1px solid black' }}>Arvostelut</Typography>
            {user && user.id !== dev.id ? (
              <Typography>Oletko tehnyt yhteistyötä tämän kehittäjän kanssa?<Button component={Link} to={`/anna-arvostelu/${dev.id}`}>Anna arvostelu</Button></Typography>
            ): null}
            {
            devRatings.length > 0 ? (
              // Calculate the average of devratings scores
              (() => {
                const totalScore = devRatings.reduce((acc, rating) => acc + rating.score, 0);
                const ratingAverage = totalScore / devRatings.length;

                return (
                  <Box>
                    <Typography>Kokonaisarvoasana</Typography>
                    <Rating value={ratingAverage} readOnly precision={0.5} max={5} />
                  </Box>
                );
              })()
            ) : null
          }
            {devRatings.length > 0 ? (
              devRatings.map((rating, index) => (
                <Box key={rating.id} sx={{ margin: '1rem', borderRadius: '0.5rem', padding: '1rem', 
                backgroundColor: 'white', color: 'black' }}>
                  <Rating value={rating.score} readOnly precision={1} max={5} />
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.user.name}</Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>{rating.timeStamp.split('T')[0].split('-').reverse().join('.')}</Typography>
                  <Typography
            sx={{
              whiteSpace: rating.description.length > 100 ? 'break-spaces' : 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: ratingDescriptions[index] ? Infinity : 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {ratingDescriptions[index]
              ? rating.description
              : `${rating.description.slice(0, 100)}${rating.description.length > 100 ? '...' : ''}`}
          </Typography>
          {rating.description.length > 100 && (
            <Button
              variant="text"
              size="small"
              onClick={() => toggleDescription(index)}
              sx={{ fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer' }}
            >
              {ratingDescriptions[index] ? 'Näytä vähemmän' : 'Näytä enemmän'}
            </Button>
          )}

                  </Box>
              ))
            ): (
              <Typography>Ei vielä arvosteluja</Typography>
            )}
          </Box>
    </Container>
  )
}

export default CompanyInfoPage
