import React, { useState } from 'react';
import Button from '@mui/material/Button';
import HomeProcess from './HomeProcess'; // Import your components
import HomeProcessDev from './HomeProcessDev'; // Import your components
import { Box, Container, Typography } from '@mui/material';
import './homeprocesschoose.css';

const HomeProcessChoose = () => {
  const [userChoice, setUserChoice] = useState('customer');

  const handleCustomerClick = () => {
    setUserChoice('customer');
  };

  const handleDeveloperClick = () => {
    setUserChoice('developer');
  };

  return (
    <Box
    className='spacerblob layerblob'
    >
      <Box
      className='spacerlow layerlow'
      >

      </Box>
        <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '3rem',
          background: 'linear-gradient(to right, #ffffff, #63E6FF)',
          WebkitBackgroundClip: 'text', // Corrected property name
          WebkitTextFillColor: 'transparent', // Corrected property name
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
          },
        }}
      >Näin homma toimii</Typography>
      <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button onClick={handleCustomerClick}
        className="bn632-hover bn26"
        sx={{
            border: userChoice === 'customer' ? '2px solid black' : 'none',
            boxShadow: userChoice === 'customer' ? '0.2rem 0.2rem 0.6rem black' : 'none',
            color: 'white',
            margin: '0.5rem',
              maxWidth: '10rem',
            }}
        >
          Asiakas
        </Button>
        <Button 
        className="bn632-hover bn26"
        sx={{
            border: userChoice === 'developer' ? '2px solid black' : 'none',
            boxShadow: userChoice === 'developer' ? '0.2rem 0.2rem 0.6rem black' : 'none',
            color: 'white',
            margin: '0.5rem',
              maxWidth: '10rem',
            }}
        onClick={handleDeveloperClick}>
          Kehittäjä
        </Button>
        </Container>
      <div>
        {userChoice === 'customer' && <HomeProcess />}
        {userChoice === 'developer' && <HomeProcessDev />}
      </div>
      <Box
     className='spacerlow layerlowbottom'
      >

      </Box>
    </Box>
  );
}

export default HomeProcessChoose;
