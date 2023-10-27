import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNotification } from '../hooks'
import { useParams } from 'react-router-dom'
import confirmemailService from '../services/confirmemail'

const ConfirmEmail = () => {

    const {id, token} = useParams()
    const notify = useNotification()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const stat = await confirmemailService.create({ id, token })
          if (stat.Status !== 'Success') {
            notify('Ilmeni jokin ongelma', 'error')
            return
          }
          notify('Sähköposti vahvistettu onnistuneesti, voit nyt kirjautua (uudelleen) sisään ja aloittaa palvelun käytön', 'success')
        } catch (e) {
          notify('Ilmeni jokin ongelma', 'error')
        }
      }

  return (
    <Container sx={{ marginTop: '6rem', minHeight: '80vh', 
    textAlign: 'center', }}>
        <Typography sx={{
            fontSize: '1.3rem',
            marginBottom: '2rem'
        }}>
            Melkein valmista! Vahvista vielä sähköpostisi alla olevasta napista, niin voit aloittaa Webly.fi-palvleun käytön!
        </Typography>
        <Button
        className="bn632-hover bn26"
        sx={{
            color: 'white'
         }}
        onClick={handleSubmit}>Vahvista sähköpostisi</Button>
    </Container>
  )
}

export default ConfirmEmail