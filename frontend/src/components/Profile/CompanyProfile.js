import React from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useSelector, useDispatch } from 'react-redux'
import { useNotification } from '../../hooks'
import ModifyBasicInfo from './ModifyBasicInfo'
import ModifyDescriptionForm from './ModifyDescriptionForm'
import { Link } from 'react-router-dom'


const CompanyProfile = () => {
  const localUser = useSelector(({user}) => user)
  const user = useSelector(({users}) => users).find(u => u.id === localUser.id)

  const notify = useNotification()
  const dispatch = useDispatch()

  const userFeedBids = useSelector(({feedBids}) => feedBids).filter(p => p.user.id === user.id)

  if (!user) {
    return null
  }

  return (
    <Container sx={{ marginTop: '7rem', minHeight: '50vh', backgroundColor: 'white', borderRadius: '1rem', marginBottom: '1rem' }}>
      <Typography>Toimijan {user.name} Profiili</Typography>
      <ModifyBasicInfo />
      <ModifyDescriptionForm />
      <Button component={Link}
      to='/lisaa-blogi'
      >Lisää blogi</Button>
      <Typography>Seuraa tekemiesi tarjousten tilannetta</Typography>
      {userFeedBids.length > 0 ? (userFeedBids.map(bid => (
        <Box key={bid.id} sx={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
        {bid.isApproved ? (
          <Box>
            <Typography>Hyväksytty ilmoittajan toimesta</Typography>
            <CheckCircleIcon />
          </Box>
        ) : (
          <Typography>Avoinna oleva tarjous</Typography>
        )}
        <Typography>Hinta: {bid.price} euroa</Typography>
        <Typography>Tarjous jätetty: {bid.timeStamp.split('T')[0]}</Typography>
        <Typography>{bid.description}</Typography>
      </Box>
      ))): (
        <Typography>Ei vielä tarjouksia</Typography>
      )}
    </Container>
  )
}

export default CompanyProfile
