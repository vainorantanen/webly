import { Container, Typography, Button, TextField, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import feedBidService from '../../services/feedbids'

const MakeBidForm = ({ post, setPost }) => {
  const [description, setDescription] = useState('')
  const [ price, setPrice ] = useState(0)

  const addFeedBid = async (newPost) => {
    const addedBid = await feedBidService.create(newPost)
    //notifyWith(`A new course '${newCourse.title}' by '${newCourse.company}' added`)
    setPost({ ...post, feedBids: post.feedBids.concat(addedBid) })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('handlesubmit', description)
    await addFeedBid({ description, timeStamp : new Date(), isApproved: false, price, target: post })
    setDescription('')
    setPrice(0)
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography sx={{ marginTop: '1rem' }}>Tarjoa</Typography>
      <Box component="form" onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        <TextField
          id="price"
          label="Hintapyyntö"
          type='number'
          value={price}
          onChange={({ target }) => setPrice(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          id="description"
          label="Kerro tarjouksestasi tarkemmin"
          multiline
          rows={12}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: 'blue', color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)' }
          }}
        >
          Lähetä tarjous
        </Button>
      </Box>
    </Container>
  )
}

export default MakeBidForm