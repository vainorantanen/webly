import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import FeedPostCard from './DevFeedPostCard'
import { useSelector } from 'react-redux'

const DevFeedItems = () => {
  const [filter1, setFilter1] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  const devsPosts = useSelector(({devsPosts}) => devsPosts)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter1])

  if (!devsPosts || devsPosts.length === 0) {
    return <Typography>Ei postauksia</Typography>
  }

  const filteredPosts = devsPosts
    .filter((post) => {
      // Filtering based on filter1
      if (filter1 === 'All' || filter1 === post.postType) {
        return true
      }
      return false
    })
    .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))

  const numOfFilteredPosts = filteredPosts.length

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

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
          <Typography sx={{ marginBottom: '1rem',}}>Hakutulokset: {numOfFilteredPosts}</Typography>
          <Typography>Tyyppi</Typography>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <Select
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <MenuItem value="All">Kaikki</MenuItem>
              <MenuItem value="normal">Myynti-ilmoitus</MenuItem>
              <MenuItem value="event">Tapahtuma</MenuItem>
              <MenuItem value="course">Koulutus tai kurssi</MenuItem>
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

export default DevFeedItems
