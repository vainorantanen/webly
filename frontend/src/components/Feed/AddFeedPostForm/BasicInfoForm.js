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
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../../hooks'
import { update } from '../../../reducers/formData'

const BasicInfoForm = forwardRef((props, ref) => {
  const formData = useSelector(state => state.formData)

  const [other, setOther] = useState(formData.other)
  const [question1, setQuestion1] = useState(formData.question1)
  const [question2, setQuestion2] = useState(formData.question2)
  const [question2Other, setQuestion2Other] = useState(formData.question2Other)
  const [question3, setQuestion3] = useState(formData.question3)
  const [question3Other, setQuestion3Other] = useState(formData.question3Other)
  const [question4, setQuestion4] = useState(formData.question4)
  const [question5, setQuestion5] = useState(formData.question5)

  const [q1Error, setQ1Error] = useState(false)
  const [q2OError, setQ2OError] = useState(false)
  const [q3OError, setQ3OError] = useState(false)
  const [q5Error, setQ5Error] = useState(false)

  const notify = useNotification()
  const dispatch = useDispatch()

  const validateFields = () => {
    let isValid = true

    if (!question1) {
      setQ1Error(true)
      isValid = false
    } else {
      setQ1Error(false)
    }

    if (question2 === 'other' && !question2Other) {
      setQ2OError(true)
      isValid = false
    } else {
      setQ2OError(false)
    }

    if (question3 === 'other' && !question3Other) {
      setQ3OError(true)
      isValid = false
    } else {
      setQ3OError(false)
    }

    if (!question5) {
      setQ5Error(true)
      isValid = false
    } else {
      setQ5Error(false)
    }

    return isValid
  }

  const handleSubmit =  () => {

    if (!validateFields()) {
      notify('Täytä kaikki pakolliset kentät', 'error')
      return
    }
    dispatch(update({
      other,
      question1,
      question2,
      question2Other,
      question3,
      question3Other,
      question4,
      question5
    }))
  }

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit,
    validateFields: validateFields
  }))

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
          error={q1Error}
          multiline
          minRows={5}
          value={question1}
          onChange={({ target }) => setQuestion1(target.value)}
          sx={{ marginBottom: '1rem',    marginTop: '1rem' }}
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
          <FormControlLabel value="other" control={<Radio />} label="Muu, mikä?" />
          {question2 === 'other' && (
            <TextField
              id="question2-other"
              label="Muu. Kerro tarkemmin."
              value={question2Other}
              required
              error={q2OError}
              onChange={({ target }) => setQuestion2Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </RadioGroup>

        {/* Question 3 */}
        <Typography>Onko olemassa teknologiasia rajoitteita?</Typography>
        <RadioGroup
          aria-label="question3"
          name="question3"
          value={question3}
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion3(event.target.value)}
        >
          <FormControlLabel value="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia." control={<Radio />} label="Tiettyjä ohjelmistoja ja teknologioita valittu, jotka voivat rajoittaa projektia." />
          <FormControlLabel value="Ohjelmitoa ja teknologioita valittu, mutta joustoa on " control={<Radio />} label="Ohjelmitoa ja teknologioita valittu, mutta joustoa on " />
          <FormControlLabel value="Ei rajoittavia tekijöitä" control={<Radio />} label="Ei rajoittavia tekijöitä" />
          <FormControlLabel value="other" control={<Radio />} label="Muu, mikä?" />
          {question3 === 'other' && (
            <TextField
              id="question3-other"
              label="Muu. Kerro tarkemmin."
              value={question3Other}
              required={q3OError}
              onChange={({ target }) => setQuestion3Other(target.value)}
              sx={{ marginLeft: '1rem' }}
            />
          )}
        </RadioGroup>

        {/* Question 4 */}
        <Typography>Tarvitsetko sivuillesi sisällönhallintatyökaluja?</Typography>
        <RadioGroup
          aria-label="question4"
          name="question4"
          value={question4}
          required
          sx={{ marginBottom: '2rem' }}
          onChange={(event) => setQuestion4(event.target.value)}
        >
          <FormControlLabel value="Laaja CMS" control={<Radio />} label="Laaja CMS" />
          <FormControlLabel value="Suppea CMS" control={<Radio />} label="Suppea CMS" />
          <FormControlLabel value="Ei tarvetta" control={<Radio />} label="Ei tarvetta" />
        </RadioGroup>

        {/* Question 5 */}
        <TextField
          id="question5"
          label="Mitä toiminnallisuuksia sivuillasi tulee olla?"
          required
          multiline
          minRows={5}
          error={q5Error}
          value={question5}
          onChange={({ target }) => setQuestion5(target.value)}
          sx={{ marginBottom: '1rem' }}
        />

        <TextField
          id="other"
          label="Mainitse mahdolliset muut toiveet."
          multiline
          minRows={5}
          value={other}
          onChange={({ target }) => setOther(target.value)}
          sx={{ marginBottom: '1rem' }}
        />
      </Box>
    </Container>
  )
})

export default BasicInfoForm
