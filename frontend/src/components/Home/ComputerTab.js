import { Box } from '@mui/material';
import React from 'react';
import computertabPic from '../../Assets/computertab1.png';
import './homeheader.css'

const ComputerTab = () => {
  return (
    <Box
      sx={{
        marginTop: '-7rem',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
      }}
    >
      <Box
        sx={{
          maxWidth: '70vw',
          height: 'auto',
          borderRadius: '0.5rem',
          boxShadow: '0.2rem 0.2rem 1.6rem black',
          '@media (max-width: 510px)': {
            maxWidth: '80vw',
          },
        }}
        component="img"
        src={computertabPic}
        alt="pic of computer tab"
      />
    </Box>
  );
};

export default ComputerTab;
