import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

import React, { useState } from 'react'

const TermsForm = ({ terms, setTerms }) => {

  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question2Other, setQuestion2Other] = useState('')
  const [question3, setQuestion3] = useState('')
  const [question3Other, setQuestion3Other] = useState('')
  const [question4, setQuestion4] = useState('')
  const [question4Other, setQuestion4Other] = useState('')
  const [question5, setQuestion5] = useState('')
  const [question6, setQuestion6] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (event) => {
    setTerms({
      question1,
      question2,
      question2Other,
      question3,
      question3Other,
      question4,
      question4Other,
      question5,
      question6,
      description
    })
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
      {/* Question 1 */}
      <TextField
        id="question1"
        label="Kerro nettisivujesi tarkoituksesta."
        required
        multiline
        rows={9}
        value={question1}
        onChange={({ target }) => setQuestion1(target.value)}
        sx={{ marginBottom: '1rem' }}
      />
        {/* Question 2 */}
        <Typography>Kenelle nettisivusi on suunnattu?</Typography>
        <RadioGroup
          aria-label="question2"
          name="question2"
          value={question2}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion2(event.target.value)}
        >
          <FormControlLabel value="Kuluttajat" control={<Radio />} label="Kuluttajat" />
          <FormControlLabel value="Yritykset tai yrittäjät" control={<Radio />} label="Yritykset tai yrittäjät" />
          <FormControlLabel value="Sisäiset sidosryhmät" control={<Radio />} label="Sisäiset sidosryhmät" />
          <FormControlLabel value="Muu. Mikä?" control={<Radio />} label="Muu. Mikä?" />
          {question2 === 'Muu. Mikä?' && (
            <TextField
              id="question2-other"
              label="Muu. Kerro tarkemmin."
              value={question2Other}
              onChange={({ target }) => setQuestion2Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </RadioGroup>

       {/* Question 3 */}
        <Typography>Mitä toimintoja nettisivuillasi on?</Typography>
        <FormGroup
          aria-label="question3"
          name="question3"
          value={question3}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion3(event.target.value)}
        >
          <FormControlLabel control={<Checkbox />} label="Tuotteiden tai palveluiden esittely" value="Tuotteiden tai palveluiden esittely" />
          <FormControlLabel control={<Checkbox />} label="Hinnaston esittely" value="Hinnaston esittely" />
          <FormControlLabel control={<Checkbox />} label="Yhteydenottolomake" value="Yhteydenottolomake" />
          <FormControlLabel control={<Checkbox />} label="Tilauslomake" value="Tilauslomake" />
          <FormControlLabel control={<Checkbox />} label="Asiakaspalveluchat" value="Asiakaspalveluchat" />
          <FormControlLabel control={<Checkbox />} label="Muu. Mikä?" value="Muu. Mikä?" />
          {question3.includes('Muu. Mikä?') && (
            <TextField
              id="question3-other"
              label="Muu. Kerro tarkemmin."
              value={question3Other}
              onChange={({ target }) => setQuestion3Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </FormGroup>

        {/* Question 4 */}
        <Typography>Onko olemassa teknologiasia rajoitteita?</Typography>
        <RadioGroup
          aria-label="question4"
          name="question4"
          value={question4}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion4(event.target.value)}
        >
          <FormControlLabel value="Ei rajoittavia tekijöitä" control={<Radio />} label="Ei rajoittavia tekijöitä" />
          <FormControlLabel value="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia." control={<Radio />} label="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia." />
          <FormControlLabel value="Ohjelmitoa ja teknologioita valittu, mutta joustoa on " control={<Radio />} label="Ohjelmitoa ja teknologioita valittu, mutta joustoa on " />
          <FormControlLabel value="Muu. Mikä?" control={<Radio />} label="Muu. Mikä?" />
          {question4 === 'Muu. Mikä?' && (
            <TextField
              id="question4-other"
              label="Muu. Kerro tarkemmin."
              value={question4Other}
              onChange={({ target }) => setQuestion4Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </RadioGroup>

        {/* Question 5 */}
        <Typography>Tarvitsetko sivuillesi sisällönhallintatyökaluja?</Typography>
        <RadioGroup
          aria-label="question5"
          name="question5"
          value={question5}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion5(event.target.value)}
        >
          <FormControlLabel value="Laaja CMS" control={<Radio />} label="Laaja CMS" />
          <FormControlLabel value="Suppea CMS" control={<Radio />} label="Suppea CMS" />
          <FormControlLabel value="Ei tarvetta" control={<Radio />} label="Ei tarvetta" />
        </RadioGroup>

        {/* Question 6 */}
        <TextField
          id="question6"
          label="Mitä toiminnallisuuksia sivuillasi tulee olla?"
          required
          multiline
          rows={9}
          value={question6}
          onChange={({ target }) => setQuestion6(target.value)}
          sx={{ marginBottom: '1rem' }}
        />

        <TextField
          id="description"
          label="Mainitse mahdolliset muut toiveet."
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
          Lähetä
        </Button>
      </Box>
    </Container>
  )
}

export default TermsForm