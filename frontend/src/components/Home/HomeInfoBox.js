import React from 'react'
import { Box, Typography } from '@mui/material'

const HomeInfoBox = () => {
  return (
    <Box
    className='spacerblurry layerblurry'
    sx={{
      display: 'flex',
      marginTop: '3rem',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      gap: '4.5rem',
      color: 'white',
      paddingTop: '4rem',
      paddingBottom: '4rem',
      marginBottom: '2rem'
    }}>
      <Box>
        <Typography sx={{
          fontSize: '2rem'
        }}>100 000+</Typography>
        <Typography>toimijaa alustalla</Typography>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: '2rem'
        }}>€100 milj.</Typography>
        <Typography>arvosta Web-projekteja toteutettu</Typography>
      </Box>
      <Box>
        <Typography sx={{
          fontSize: '2rem'
        }}>100+</Typography>
        <Typography>toimijaa alustalla</Typography>
      </Box>
    </Box>
  )
}

export default HomeInfoBox