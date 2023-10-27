import { Box, Typography } from '@mui/material';
import React from 'react';
import './homeheader.css'
import CheckIcon from '@mui/icons-material/Check';
import weblylogo from '../../Assets/weblylogo.png'
import remotePic from '../../Assets/remote-choose.png'
import devPic from '../../Assets/developer.png'

const boxStyle = { borderRadius: '0.5rem', 
boxShadow: '0rem 0rem 0.4rem 0.05rem black',
backgroundColor: 'white',
padding: '0.5rem',
height: 'auto', width: '16rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}

const ComputerTab = () => {
  return (
    <Box
          sx={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            justifyContent: 'center', marginTop: '3rem', gap: '1rem',
            marginLeft: '0.5rem', marginRight: '0.5rem',
          }}>
            <Box sx={boxStyle}>
              <Typography sx={{ fontSize: '1.3rem', textAlign: 'center' }}>Asiakas</Typography>
              <Typography sx={{ textAlign: 'center' }}>Etsii verkkosivuston tekijää</Typography>
              <Box
              component='img'
              src={remotePic}
              sx={{
                width: '10rem', height: 'auto',
              }}></Box>
              <Typography><CheckIcon />Tarjouspyynnön jättäminen on nopeaa ja helppoa</Typography>
              <Typography><CheckIcon />Yhdellä tarjouspyynnöllä monta tarjousta</Typography>
              <Typography><CheckIcon />Säästä aikaa nettisivuprojektin toteuttajan etsimisessä</Typography>
              <Typography><CheckIcon />Kilpailuttamalla löydät itsellesi sopivimman tekijän</Typography>

            </Box>

            <Box sx={boxStyle}>
              <Typography sx={{ fontSize: '1.3rem', textAlign: 'center' }}>Webly.fi</Typography>
              <Typography sx={{ textAlign: 'center' }}>Yhdistävä alusta</Typography>
              <Box
              component='img'
              src={weblylogo}
              sx={{
                width: '10rem', height: 'auto',
              }}></Box>
              <Typography><CheckIcon />Nettisivujen myyjien ja ostajien kohtaamispaikka</Typography>  
              <Typography><CheckIcon />Tarjoupyynnön jättäminen on ilmaista</Typography>
              <Typography><CheckIcon />Tarjousten tekeminen on ilmaista</Typography>
              <Typography><CheckIcon />Jos et ole tyytyväinen tarjouksiin, voit neuvotella!</Typography>            
            </Box>

            <Box sx={boxStyle}>
              <Typography sx={{ fontSize: '1.3rem', textAlign: 'center' }}>Kehittäjä</Typography>
              <Typography sx={{ textAlign: 'center' }}>Verkkosivuston toteuttaja</Typography>
              <Box
              component='img'
              src={devPic}
              sx={{
                width: '10rem', height: 'auto',
              }}></Box>
              <Typography><CheckIcon />Löydä uusia asiakkaita päivittäin!</Typography>
              <Typography><CheckIcon />Rakenna brändiäsi erottumalla kilpailijoista</Typography>
              <Typography><CheckIcon />Säästä markkinoinnin kustannuksissa</Typography>
              <Typography><CheckIcon />Tarjouksien tekeminen on nopeaa ja helppoa</Typography>
            </Box>
          </Box>
  );
};

export default ComputerTab;
