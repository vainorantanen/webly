import { Box, Container, Typography } from '@mui/material'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginSuggestion from '../../LoginSuggestion'
import MessageCard from './MessageCard'
import { useNotification } from '../../../hooks'
import { initializeCustomerInfos } from '../../../reducers/customerinfo'

const AllContactMessages = () => {

    const dispatch = useDispatch()
    const notify = useNotification()

    useEffect(() => {
        // Fetch portal posts when the component mounts
        try {
            dispatch(initializeCustomerInfos())
        } catch (error) {
            notify('Tapahtui virhe haettaessa tietoja')
            console.error('Error fetching portal posts:', error);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch]);

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
        <Typography sx={{
            textAlign: 'center', fontSize: '1.3rem', marginBottom: '1rem'
        }}>{user.userType === 'regular' ? 'Lähetetyt yhteydenottopyynnöt' : 'Vastaanotetut yhteydenottopyynnöt'}</Typography>
        {customerInfos && customerInfos.length > 0 ? (
            customerInfos.map(customerinfo => (
                <Box key={customerinfo.id}>
                    <MessageCard customerinfo={customerinfo}/>
                </Box>
            ))
        ) : (
            <Typography>Ei vielä yhteydenottoa</Typography>
        )}
    </Container>
  )
}

export default AllContactMessages