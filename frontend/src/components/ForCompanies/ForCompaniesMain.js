import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ForCompaniesMain = () => {
  return (
    <Container sx={{ marginTop: '7rem', minHeight: '80vh' }}>
      <Typography sx={{
        fontSize: '2.3rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>Yrityksille ja kehittäjille</Typography>
      <Typography sx={{
        fontSize: '1.35rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>Webly.fi auttaa yrityksiä ja muita kehittäjiä tehostamaan myyntiä ja liiketoimintaansa</Typography>
      <Container sx={{ marginTop: '3rem', marginBottom: '2rem',
    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
    gap: '1rem' }}>
      <Box sx={{ textAlign: 'center', maxWidth: '20rem' }}>
        <CheckCircleIcon sx={{fontSize: '3rem', color: 'blue'}}/>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Palveluun lisätään lukuisia tarjouspyyntöjä kuukausittain</Typography>
        <Typography>Pääset käsiksi suureen ja monipuoliseen
           verkkopalveluiden asiakaskantaan ympäri Suomen.</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', maxWidth: '20rem' }}>
        <CheckCircleIcon sx={{fontSize: '3rem', color: 'blue'}}/>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Tarjouksien tekeminen on nopeaa ja helppoa</Typography>
        <Typography>Tehosta työntekoasi digitaalisilla tarjouksilla sekä projektimyyntiä tukevilla toiminnoilla.</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', maxWidth: '20rem' }}>
        <CheckCircleIcon sx={{fontSize: '3rem', color: 'blue'}}/>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Keskeneräisten kauppojen hallinta on helppoa</Typography>
        <Typography>Alusta auttaa sinua pysymään tilanteen tasalla,
           oli kyse sitten avoimista ilmoituksista,
           hyväksytyistä tarjouksista tai neuvotteluista.</Typography>
      </Box>
      <br></br>
      <Box sx={{ textAlign: 'center', maxWidth: '20rem' }}>
        <CheckCircleIcon sx={{fontSize: '3rem', color: 'blue'}}/>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Kaupat paremmalla todennäköisyydellä</Typography>
        <Typography>Laadukkaat myynti-ilmoitukset, vapaus valita avoimesta ja portaalin kautta tapahtuvasta tarjouskilpailusta, sekä
           neuvottelu-toiminto mahdollistavat nettisivuprojektien hankkimisen korkealla tarkkuudella. Kun tietää missä mennään kilpailijoihin verrattuna,
           onnistuneen kaupan todennäköisyys kasvaa ja turha työ vähenee.</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', maxWidth: '20rem' }}>
        <CheckCircleIcon sx={{fontSize: '3rem', color: 'blue'}}/>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Neuvottelutoiminto auttaa kauppojen klousaamisessa</Typography>
        <Typography>Mikäli asiakas tai myyjä ei ole täysin tyytyväinen projektiin tai sen hintaan,
           voitte neuvotella.
           Vastata voi sähköisesti vastatarjouksella, pitäytymällä tarjouksessaan
            tai vaikkapa soittamalla tai sähköpostilla.
             Yhteisymmärrykseen pääsemisen todennäköisyys kasvaa.</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', maxWidth: '20rem' }}>
        <CheckCircleIcon sx={{fontSize: '3rem', color: 'blue'}}/>
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Säästöt markkinoinnissa</Typography>
        <Typography>Me pidämme huolen siitä, että uutta projektia tulee sivustolle tasaiseen tahtiin,
           jotta sinun ei tarvitse käyttää rahaa mainontaan saadaksesi hankittua uusia asiakkaita.</Typography>
      </Box>

      </Container>
      <Typography sx={{ textAlign: 'center', marginTop: '2rem' }}>
      Ilmoitusten selailu ja tarjouksien tekeminen on ilmaista, välityspalkkio veloitetaan ainoastaan toteutuneista kaupoista.
      </Typography>
    </Container>
  )
}

export default ForCompaniesMain