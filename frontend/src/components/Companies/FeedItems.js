import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { useSelector } from 'react-redux'
import Company from './Company'

const FeedItems = () => {
  const [filter1, setFilter1] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [filter1])

  const devs = useSelector(({users}) => users).filter(d => d.userType !== 'regular')

  if (!devs || devs.length === 0) {
    return (
      <Container sx={{ marginTop: '6rem' }}>
        <Typography>Ei löytynyt yhtään kehittäjää</Typography>
      </Container>
    )
  }

  const filteredDevs = devs
    .filter((d) => {
      // Filtering based on filter1
      if (filter1 === 'All' || d.userType === filter1) {
        return true
      }
      return false
    })

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentDevs = filteredDevs.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Box>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          '@media (min-width: 600px)': {
            flexDirection: 'row',
            alignItems: 'flex-start',
          },
        }}
      >
        {/* Left Column - Filtering options */}
        <Box sx={{ flex: 1, maxWidth: '15rem' }}>
          <Typography sx={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Suodata</Typography>
          <Typography>Valitse kehittäjän tyyppi</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <Select
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <MenuItem value="All">Kaikki</MenuItem>
              <MenuItem value="company">Yritys</MenuItem>
              <MenuItem value="freelancer">Freelancer</MenuItem>
              <MenuItem value="other">Muut</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Right Column - Filtered posts */}
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {/* Rendering the current page of filtered posts */}
            {currentDevs.map((dev) => (
              <Company key={dev.id} dev={dev} />
            ))}
          </Box>
          {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(devs.length / postsPerPage) }).map((_, index) => (
              <Button
                sx={{
                  backgroundColor: currentPage === index + 1 ? 'blue' : 'transparent',
                  color: currentPage === index + 1 ? 'white' : 'inherit',
                  ':hover': {
                    backgroundColor: currentPage === index + 1 ? 'blue' : '#8B8FFF',
                  },
                }}
                key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FeedItems