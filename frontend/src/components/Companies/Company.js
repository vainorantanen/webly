import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box, Rating } from '@mui/material'
import { useSelector } from 'react-redux'

const Company = ({ dev }) => {

  const devRatings = useSelector(({ratings}) => ratings).filter(r => r.targetUser.id === dev.id)


  return (
    <Box
      component={Link}
      to={`/kehittajat/${dev.id}`}
      sx={{
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        color: 'black',
        marginLeft: '3rem',
        marginRight: '3rem',
        display: 'flex',
        transition: '0.3s linear all',
        flexDirection: 'column',
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
      <Box sx={{ display: 'flex', flexDirection: 'row',
    flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <Box>
      <Typography
        sx={{
          fontSize: '1.5rem',
        }}
      >
        {dev.name}
      </Typography>
      </Box>
      {
            devRatings.length > 0 ? (
              // Calculate the average of devratings scores
              (() => {
                const totalScore = devRatings.reduce((acc, rating) => acc + rating.score, 0);
                const ratingAverage = totalScore / devRatings.length;

                return (
                  <Box>
                    <Typography><Rating value={ratingAverage} readOnly precision={0.5} max={5} />({devRatings.length})</Typography>
                  </Box>
                );
              })()
            ) : (
              <Typography>0 arvostelua</Typography>
            )
          }
        </Box>
      {dev.userType === 'freelancer' && (
        <Typography sx={{
          marginBottom: '0.5rem',
          borderBottom: '1px solid black'
        }}>Freelancer
        </Typography>
        )}
      {dev.userType === 'company' && (
        <Typography sx={{
          marginBottom: '0.5rem',
          borderBottom: '1px solid black'
        }}>Yritys
        </Typography>
        )}
        {dev.userType === 'otherDev' && (
        <Typography sx={{
          marginBottom: '0.5rem',
          borderBottom: '1px solid black'
        }}>Muu kehittäjä
        </Typography>
        )}
      <Typography sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'break-spaces',
        display: '-webkit-box',
        WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4', // Increase line height for better readability
      }}>{dev.description}</Typography>
    </Box>
  )
}

export default Company
