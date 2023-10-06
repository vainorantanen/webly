import { Container, Typography } from '@mui/material'
import React from 'react'

const UserDisabledText = () => {
  return (
    <Container sx={{ marginTop: '8rem', minHeight: '100vh', textAlign: 'center', }}>
        <Typography
          sx={{
            fontSize: '1.3rem',
            '@media (max-width: 442px)': {
              fontSize: '1rem',
            },
          }}
        >
          Käyttäjäsi on disabloitu.<br></br>
          Tarkempia tietoja varten ota yhteyttä ylläpitoon webline@webline.fi
        </Typography>
      </Container>
  )
}

export default UserDisabledText