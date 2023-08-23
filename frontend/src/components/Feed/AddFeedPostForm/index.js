import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,

} from '@mui/material'
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../../hooks'
import { addFeedPost } from '../../../reducers/feedPosts'

import BasicInfoForm from './BasicInfoForm'
import TermsForm from './TermsForm'
import FormSummary from './FormSummary'

const defaultBasicInfo = {
  description: '',
  question1: '',
  question2: '',
  question3: '',
  question4: '',
  question5: '',
  question6: ''
}

const AddFeedPostForm = () => {
  const [basicInfo, setBasicInfo] = useState(defaultBasicInfo)

  const steps = ['Perustiedot', 'Ilmoituksen ehdot', 'Yhteenveto']

  const user = useSelector(({ user }) => user)
  const notify = useNotification()
  
  
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(addFeedPost({
        description: basicInfo.description,
        timeStamp: new Date(),
        isOpen: true,
        question1: basicInfo.question1,
        question2: basicInfo.question2,
        question3: basicInfo.question3,
        question4: basicInfo.question4,
        question5: basicInfo.question5,
        question6: basicInfo.question6
      }))
      setBasicInfo(defaultBasicInfo)
      notify('Postaus lisätty onnistuneesti', 'success')
    } catch (error) {
      notify('Ilmeni jokin ongelma postauksen teossa, yritä myöhemmin uudelleen', 'error')
    } 
  }
  
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  
  
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

      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            { activeStep === 0 ? (
              <BasicInfoForm basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
            ) : activeStep === 1 ?(
              <TermsForm basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
            ) : (
              <FormSummary basicInfo={basicInfo} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

    </Container>
  )
}

export default AddFeedPostForm
