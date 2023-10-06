import { Container, Typography } from '@mui/material'
import React from 'react'

const UserDisabledText = () => {
  return (
    <Container>
          <Typography>Käyttäjäsi on disabloitu, et voi suorittaa tätä toimintoa</Typography>
            <ul>
              <li><Typography>Jos sinulla on kysyttävää, ota yhteyttä webline@webline.fi</Typography></li>
              <li><Typography>Jos tiedät, että disablointisi on poistettu, mutta törmäät
                silti tähän virheeseen: Yritä päivittää sivu ja kirjautua uudelleen sisään</Typography></li>
            </ul>
      </Container>
  )
}

export default UserDisabledText