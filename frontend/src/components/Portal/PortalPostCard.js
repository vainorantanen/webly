import React from 'react'
import { Typography, Box, Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper, } from '@mui/material'
import { Link } from 'react-router-dom'
import EuroIcon from '@mui/icons-material/Euro';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDate } from '../../Functions/formatDate';

const PortalPostCard = ({ post }) => {

  return (
    <Box
    component={Link}
        to={`/portaali/ilmoitukset/${post.id}`}
      sx={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: 'black',
        marginLeft: '3rem',
        marginRight: '3rem',
        display: 'flex',
        transition: 'all 0.3s linear',
        flexDirection: 'column',
        marginTop: '1rem',
        '@media (max-width: 820px)': {
          marginLeft: '0.1rem',
          marginRight: '0.1rem',
        },
        '&:hover': {
          backgroundColor: '#DDDDDD',
          boxShadow: '0rem 0.1rem 0.3rem gray'
      },
      }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
      justifyContent: 'space-between', padding: '0.3rem', borderRadius: '0.3rem',
      backgroundColor: 'white', boxShadow: '0rem 0.1rem 0.3rem gray' }}>
          <Box>
          {post.isOpen ? (
            <Typography>Avoinna oleva ilmoitus</Typography>
          ) : (
            <Typography>Ilmoitus suljettu</Typography>
          )}
          <Typography>{post.user.name}</Typography>
          {post.timeStamp ? (
            <Typography>Julkaistu {formatDate(post.timeStamp)}</Typography>
          ) : (
            <Typography>Julkaistu yli vuosi sitten</Typography>
          )}
          </Box>
          <Box>
          <Typography><EuroIcon />{post.minPrice} - {post.maxPrice}</Typography>
          <Typography><AccessTimeIcon />{formatDate(post.dueDate)}</Typography>
          </Box>
      </Box>

      {/* Displaying answers */}
      <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem'
       }}>Tarkoitus</Typography>
        <Typography style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'break-spaces',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4',
         }}>{post.description}</Typography>
        <Typography sx={{ borderBottom: '1px solid black', fontSize: '1.2rem',
        marginBottom: '0.5rem', marginTop: '1rem'}}
        >Tietoa</Typography>
        <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Sivut on suunnattu:</TableCell>
              <TableCell>{post.question1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Teknologiset rajoitteet:</TableCell>
              <TableCell>{post.question2}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sisällönhallintatyökalut:</TableCell>
              <TableCell>{post.question3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Toiminnallisuudet:</TableCell>
              <TableCell
              sx={{
                overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'break-spaces',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
              }}
              >{post.question4}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      <Button
        
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

export default PortalPostCard
