import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import LoginSuggestion from '../../LoginSuggestion'

const AllContactMessages = () => {

    const user = useSelector(({user}) => user)
    const customerInfos = useSelector(({customerInfos}) => customerInfos)

    if (!user) {
        return (
            <Box>
                <LoginSuggestion />
            </Box>
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography>Yhteydenotot</Typography>
        {customerInfos && customerInfos.length > 0 ? (
            customerInfos.map(customerinfo => (
                <Box key={customerinfo.id}>
                    <Typography>{customerinfo.message}</Typography>
                    <Typography>Email: {customerinfo.senderEmail}</Typography>
                    <Typography>Puhelin: {customerinfo.senderPhone}</Typography>
                </Box>
            ))
        ) : (
            <Typography>Ei vielä yhteydenottoa</Typography>
        )}
    </Container>
  )
}

export default AllContactMessages