import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import LoginSuggestion from '../../LoginSuggestion'
import MessageCard from './MessageCard'
import PortalBidCard from '../../Portal/PortalBidCard'
import { Link } from 'react-router-dom'
import FeedBidCard from '../../Feed/FeedBidCard'

const AllContactMessages = () => {

    const user = useSelector(({user}) => user)
    const customerInfos = useSelector(({customerInfos}) => customerInfos)
    const userPortalBids = useSelector(({portalBids}) => portalBids)
    const userPortalPosts = useSelector(({portalPosts}) => portalPosts)
    const userFeedPosts = useSelector(({feedPosts}) => feedPosts)
    const userFeedBids = useSelector(({feedBids}) => feedBids).filter(f => f.user.id === user.id)


    if (!user) {
        return (
            <Box>
                <LoginSuggestion />
            </Box>
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{
            textAlign: 'center', fontSize: '1.3rem', marginBottom: '1rem'
        }}>{user.userType === 'regular' ? 'Lähetetyt yhteydenottopyynnöt' : 'Vastaanotetut yhteydenottopyynnöt'}</Typography>
        {customerInfos && customerInfos.length > 0 ? (
            customerInfos.map(customerinfo => (
                <Container key={customerinfo.id} sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <MessageCard customerinfo={customerinfo}/>
                    {customerinfo.relatedPortalBid && (
                        <Container>
                            <Button component={Link} to={`/portaali/ilmoitukset/${customerinfo.relatedPortalPost}`}>Siirry ilmoitukseen</Button>
                            <Button component={Link} to={`/neuvottelu/${customerinfo.id}`}>Chat</Button>
                            <Typography>Liittyvä tarjous</Typography>
                        <PortalBidCard offer={userPortalBids.find(b => b.id === customerinfo.relatedPortalBid)}
                        post={userPortalPosts.find(p => p.id === customerinfo.relatedPortalPost)}
                        />
                        </Container>
                    )}
                    {customerinfo.relatedFeedBid && (
                        <Container>
                            <Button component={Link} to={`/tarjouskilpailut/${customerinfo.relatedFeedPost}`}>Siirry ilmoitukseen</Button>
                            <Button component={Link} to={`/neuvottelu/${customerinfo.id}`}>Chat</Button>
                            <Typography>Liittyvä tarjous</Typography>
                            <FeedBidCard offer={userFeedBids.find(b => b.id === customerinfo.relatedFeedBid)}
                        post={userFeedPosts.find(p => p.id === customerinfo.relatedFeedPost)}
                        />
                        </Container>
                    )}
                </Container>
            ))
        ) : (
            <Typography>Ei vielä yhteydenottoa</Typography>
        )}
    </Container>
  )
}

export default AllContactMessages