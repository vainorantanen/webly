import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'

import feedPostService from '../../services/feedposts'

const AddFeedPostForm = ({ user, feedPosts, setFeedPosts }) => {
  const [description, setDescription] = useState('')
  const [question1, setQuestion1] = useState('Yksisivuinen (one-page) verkkosivu')
  const [question2, setQuestion2] = useState('Tuotteiden tai palveluiden esittely')
  const [question3, setQuestion3] = useState('Yhteydenottolomake ja yhteystiedot')

  const addFeedPost = async (newPost) => {
    const addedPost = await feedPostService.create(newPost)
    setFeedPosts(feedPosts.concat(addedPost))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await addFeedPost({
      description,
      timeStamp: new Date(),
      isOpen: true,
      question1,
      question2,
      question3
    })
    setDescription('')
    setQuestion1('Yksisivuinen (one-page) verkkosivu')
    setQuestion2('Tuotteiden tai palveluiden esittely')
    setQuestion3('Yhteydenottolomake ja yhteystiedot')
  }

  if (!user || user.isCompany) {
    return (
      <Container sx={{ marginTop: '8rem', minHeight: '100vh' }}>
        <Typography
          sx={{
            fontSize: '1.3rem',
            textAlign: 'center',
            marginTop: '2rem',
            '@media (max-width: 442px)': {
              fontSize: '1rem',
            },
          }}
        >
          Kirjaudu kuluttajatilillä sisään lisätäksesi ilmoitus.
        </Typography>
      </Container>
    )
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
        borderRadius: '1rem',
      }}
    >
      <Typography
        sx={{
          fontSize: '1.3rem',
          textAlign: 'center',
          marginTop: '6rem',
          '@media (max-width: 442px)': {
            fontSize: '1rem',
          },
        }}
      >
        Lisää ilmoitus
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
          marginBottom: '2rem',
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        {/* Multiple-Choice Question 1 */}
        <Typography>Kuinka monta sivua haluat nettisivuillesi?</Typography>
        <RadioGroup
          aria-label="question1"
          name="question1"
          value={question1}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion1(event.target.value)}
        >
          <FormControlLabel value="Yksisivuinen (one-page) verkkosivu" control={<Radio />} label="Yksisivuinen (one-page) verkkosivu" />
          <FormControlLabel value="2-5 sivua" control={<Radio />} label="2-5 sivua" />
          <FormControlLabel value="6-10 sivua" control={<Radio />} label="6-10 sivua" />
          <FormControlLabel value="Yli 10 sivua" control={<Radio />} label="Yli 10 sivua" />
        </RadioGroup>

        {/* Multiple-Choice Question 2 */}
        <Typography>Mikä on verkkosivunne pääasiallinen tarkoitus?</Typography>
        <RadioGroup
          aria-label="question2"
          name="question2"
          value={question2}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion2(event.target.value)}
        >
          <FormControlLabel value="Tuotteiden tai palveluiden esittely" control={<Radio />} label="Tuotteiden tai palveluiden esittely" />
          <FormControlLabel value="Liidien ja tiedustelujen generointi" control={<Radio />} label="Liidien ja tiedustelujen generointi" />
          <FormControlLabel value="Tuotteiden myynti verkossa (verkkokauppa)" control={<Radio />} label="Tuotteiden myynti verkossa (verkkokauppa)" />
          <FormControlLabel value="Tiedon jakaminen tai blogiartikkelit" control={<Radio />} label="Tiedon jakaminen tai blogiartikkelit" />
        </RadioGroup>

        {/* Multiple-Choice Question 3 */}
        <Typography>Mitä ominaisuuksia haluatte sisällyttää verkkosivullenne?</Typography>
        <RadioGroup
          aria-label="question3"
          name="question3"
          value={question3}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion3(event.target.value)}
        >
          <FormControlLabel value="Yhteydenottolomake ja yhteystiedot" control={<Radio />} label="Yhteydenottolomake ja yhteystiedot" />
          <FormControlLabel value="Kuvagalleria tai portfoliokuvat" control={<Radio />} label="Kuvagalleria tai portfoliokuvat" />
          <FormControlLabel value="Suosittelut tai arvostelut -osio" control={<Radio />} label="Suosittelut tai arvostelut -osio" />
          <FormControlLabel value="Sosiaalisen median integraatio (jakopainikkeet, syötteet jne.)" control={<Radio />} label="Sosiaalisen median integraatio (jakopainikkeet, syötteet jne.)" />
        </RadioGroup>

        <TextField
          id="description"
          label="Kuvaile nettisivuasi tarkemmin..."
          required
          multiline
          rows={15}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginBottom: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, #003eff, #006eff)',
            },
          }}
        >
          Julkaise
        </Button>
      </Box>
    </Container>
  )
}

export default AddFeedPostForm
