import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import FeedPostCard from './FeedPostCard'

const FeedItems = ({ feedPosts }) => {
  const [filter1, setFilter1] = useState('All')
  const [filter2, setFilter2] = useState('All')
  const [filter3, setFilter3] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const filteredPosts = feedPosts
    .filter((post) => {
      // Filtering based on filter1
      if (filter1 === 'All' || post.question1 === filter1) {
        // Filtering based on filter2
        if (filter2 === 'All' || post.question2 === filter2) {
          // Filtering based on filter3
          if (filter3 === 'All' || post.question3 === filter3) {
            return true
          }
        }
      }
      return false
    })
    .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter1, filter2, filter3])

  return (
    <Box sx={{ marginTop: '4rem' }}>
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
          <Typography sx={{ marginBottom: '1rem' }}>Suodata</Typography>
          <Typography>Kuinka monta sivua haluat nettisivuillesi?</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <Select
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <MenuItem value="All">Kaikki</MenuItem>
              <MenuItem value="Yksisivuinen (one-page) verkkosivu">Yksisivuinen (one-page) verkkosivu</MenuItem>
              <MenuItem value="2-5 sivua">2-5 sivua</MenuItem>
              <MenuItem value="6-10 sivua">6-10 sivua</MenuItem>
              <MenuItem value="Yli 10 sivua">Yli 10 sivua</MenuItem>
            </Select>
          </FormControl>

          <Typography>Mikä on verkkosivunne pääasiallinen tarkoitus?</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Select
              value={filter2}
              onChange={(e) => setFilter2(e.target.value)}
            >
              <MenuItem value="All">Kaikki</MenuItem>
              <MenuItem value="Tuotteiden tai palveluiden esittely">Tuotteiden tai palveluiden esittely</MenuItem>
              <MenuItem value="Liidien ja tiedustelujen generointi">Liidien ja tiedustelujen generointi</MenuItem>
              <MenuItem value="Tuotteiden myynti verkossa (verkkokauppa)">
                Tuotteiden myynti verkossa (verkkokauppa)
              </MenuItem>
              <MenuItem value="Tiedon jakaminen tai blogiartikkelit">Tiedon jakaminen tai blogiartikkelit</MenuItem>
            </Select>
          </FormControl>

          <Typography>Mitä ominaisuuksia haluatte sisällyttää verkkosivullenne?</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Select
              value={filter3}
              onChange={(e) => setFilter3(e.target.value)}
            >
              <MenuItem value="All">Kaikki</MenuItem>
              <MenuItem value="Yhteydenottolomake ja yhteystiedot">Yhteydenottolomake ja yhteystiedot</MenuItem>
              <MenuItem value="Kuvagalleria tai portfoliokuvat">Kuvagalleria tai portfoliokuvat</MenuItem>
              <MenuItem value="Suosittelut tai arvostelut -osio">Suosittelut tai arvostelut -osio</MenuItem>
              <MenuItem value="Sosiaalisen median integraatio (jakopainikkeet, syötteet jne.)">
                Sosiaalisen median integraatio (jakopainikkeet, syötteet jne.)
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Right Column - Filtered posts */}
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              borderRadius: '1rem',
            }}
          >
            {/* Rendering the current page of filtered posts */}
            {currentPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </Box>
          {/* Pagination */}
          <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
              <Button
                sx={{
                  backgroundColor: currentPage === index + 1 ? 'blue' : 'transparent',
                  color: currentPage === index + 1 ? 'white' : 'inherit',
                  ':hover': {
                    backgroundColor: currentPage === index + 1 ? 'blue' : 'lightblue',
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
