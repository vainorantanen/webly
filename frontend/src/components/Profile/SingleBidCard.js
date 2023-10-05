import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro';
import BusinessIcon from '@mui/icons-material/Business';
import StartIcon from '@mui/icons-material/Start';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleBidCard = ({offer}) => {

    const user = useSelector(({user})=> user)

      if (!user || !offer) {
        return null
      }

  return (
    <Box
          sx={{
            padding: '1rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.5rem',
            marginLeft: '3rem',
            marginRight: '3rem',
            border: offer.isApproved ? '5px solid #C1FFA6' : 'none',
            display: 'flex',
            marginTop: '1rem',
            transition: '0.3s ease',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: '1rem',
            '@media (max-width: 820px)': {
              marginLeft: '0.1rem',
              marginRight: '0.1rem',
            },
            '@media (max-width: 650px)': {
                justifyContent: 'center',
                flexDirection: 'column'
              },
          }}
          >
            <Box sx={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '0.5rem',
        width: '30%', 
        '@media (max-width: 650px)': {
            width: '90%'
          },
        }}>
            {offer.isApproved && (
              <Typography sx={{ fontSize: '1.2rem' }}>Tarjous hyväksytty <CheckCircleIcon/></Typography>
            )}
            <Typography><EuroIcon />Tarjoushinta: {offer.price} euroa</Typography>
            <Typography><StartIcon />Tarjous jätetty: {offer.timeStamp.split('T')[0].split('-').reverse().join('.')}</Typography>
            <Typography><AccessTimeIcon />Tarjous voimassa: {offer.dueDate || 'Ei tietoa'}</Typography>
            {user && user.id === offer.user.id && (
              <Button>Siirry ilmoitukseen</Button>
            )}
            </Box>
            <Box sx={{ width: '65%',
            '@media (max-width: 650px)': {
                width: '90%'
              },
        }}>
                <Typography sx={{ fontSize: '1.1rem', marginBottom: '0.5rem',
            borderBottom: '1px solid black' }}>Tarjouksen kuvaus:</Typography>
                <Typography sx={{ whiteSpace: 'break-spaces' }}>{offer.description}</Typography>
            </Box>
          </Box>
        
  )
}

export default SingleBidCard