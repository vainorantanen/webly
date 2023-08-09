import React from 'react'
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQSection = () => {
  return (
    <Container sx={{ marginTop: '5rem', marginBottom: '5rem' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '4rem' }}>
        Usein kysytyt kysymykset
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Maksaako tarjouskilpailun aloitus jotain?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ei maksa. Tarjouskilpailun voi suorittaa alusta loppuun täysin ilmaiseksi.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Sitoudunko ostamaan nettisivut, jos aloitan tarjouskilpailun?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Et sitoudu. Tarjouskilpailu ei sido sinua ostamaan nettisivua tarjouskilpailusta.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Voinko suorittaa tarjouskilpailun anonyymisti?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                Kyllä voit! Kummankaan osapuolen ei tarvitse paljastaa omaa tai yrityksensä nimeä tarjouskilpailussa.
                Toki on mahdollista tehdä osallistua tarjouskilpailuun julkisestikin.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Add more Accordion components for additional questions and answers */}
    </Container>
  )
}

export default FAQSection