import { Box, Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BidCard from '../BidCard'
import { Link } from 'react-router-dom'

const CompanyApprovedBids = () => {

    const user = useSelector(({user}) => user)

    const userApprovedFeedBids = useSelector(({feedBids}) => feedBids)
        .filter(f => f.user.id === user.id && f.isApproved)

    const userApprovedPortalBids = useSelector(({portalBids}) => portalBids)
        .filter(b => b.isApproved)
    
        if (!user || user.userType === 'regular') {
        return null
    };

  return (
    <Container sx={{ marginTop: '5rem' }}>
        <Typography>Hyväksytyt tarjoukset</Typography>
        <Typography>Avoimiin ilmoituksiin tehdyt</Typography>
        {userApprovedFeedBids && userApprovedFeedBids.length > 0 ? (
            userApprovedFeedBids.map(b => (
                <Box key={b.id}>
                    <BidCard offer={b}/>
                    <Button component={Link} to={`/tarjouskilpailut/${b.targetPost}`}>Siirry ilmoitukseen</Button>
                    <Box></Box>
                </Box>
            ))
        ) : (
            <Typography>Ei hyväksyttyjä tarjouksia</Typography>
        )}
        <Typography>Portaali-ilmoituksiin tehdyt</Typography>
        {userApprovedPortalBids && userApprovedPortalBids.length > 0 ? (
            userApprovedPortalBids.map(b => (
                <Box key={b.id}>
                    <BidCard offer={b}/>
                    <Button component={Link} to={`/portaali/ilmoitukset/${b.targetPost}`}>Siirry ilmoitukseen</Button>
                </Box>
            ))
        ) : (
            <Typography>Ei hyväksyttyjä tarjouksia</Typography>
        )}
    </Container>
  )
}

export default CompanyApprovedBids