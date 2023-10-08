import React, { useState } from 'react';
import Button from '@mui/material/Button';
import HomeProcess from './HomeProcess'; // Import your components
import HomeProcessDev from './HomeProcessDev'; // Import your components
import { Box, Container, Typography } from '@mui/material';

const HomeProcessChoose = () => {
  const [userChoice, setUserChoice] = useState('customer');

  const handleCustomerClick = () => {
    setUserChoice('customer');
  };

  const handleDeveloperClick = () => {
    setUserChoice('developer');
  };

  return (
    <Box>
        <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '3rem',
          background: 'linear-gradient(to right, #0004FF, #63E6FF)',
          WebkitBackgroundClip: 'text', // Corrected property name
          WebkitTextFillColor: 'transparent', // Corrected property name
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}
      >Näin homma toimii</Typography>
      <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button variant="contained" onClick={handleCustomerClick}
        sx={{
            backgroundColor: 'blue',
            color: 'white',
            transition: 'transform 0.3s',
            marginBottom: '1rem',
            maxWidth: '9rem',
            marginLeft: '1rem',
            borderRadius: '1rem',
            border: userChoice === 'customer' ? '2px solid black' : 'none',
            boxShadow: userChoice === 'customer' ? '0.2rem 0.2rem 0.6rem black' : 'none',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
            },}}
        >
          Asiakas
        </Button>
        <Button variant="contained"
        sx={{
            backgroundColor: 'blue',
            color: 'white',
            transition: 'transform 0.3s',
            marginBottom: '1rem',
            maxWidth: '9rem',
            marginLeft: '1rem',
            borderRadius: '1rem',
            border: userChoice === 'developer' ? '2px solid black' : 'none',
            boxShadow: userChoice === 'developer' ? '0.2rem 0.2rem 0.6rem black' : 'none',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
            },}}
        
        onClick={handleDeveloperClick}>
          Kehittäjä
        </Button>
        </Container>
      <div>
        {userChoice === 'customer' && <HomeProcess />}
        {userChoice === 'developer' && <HomeProcessDev />}
      </div>
    </Box>
  );
}

export default HomeProcessChoose;
