import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoginSuggestion from '../LoginSuggestion'
import { Box, Container, Grid, IconButton, TextField,
    Button, Typography, useMediaQuery } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useNotification } from '../../hooks'
import { addMessage } from '../../reducers/customerinfo'

const Chat = () => {
    const [message, setMessage] = useState('');
    const [ isOffer, setIsOffer ] = useState(false)

    const { id } = useParams()
    const user = useSelector(({user}) => user)
    const customerInfo = useSelector(({customerInfos}) => customerInfos).find(c => c.id === id)
    const notify = useNotification()
    const dispatch = useDispatch()

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleSendMessage = async (event) => {
      console.log('send')
      event.preventDefault()
      try {
      const result = await dispatch(addMessage({id: customerInfo.id, content: message, isOffer }))
        if (result && result.error) {
          notify('Tapahtui virhe palvelimella', 'error')
          return
        } else {
            setMessage('')
            setIsOffer(false)
        }
    } catch (error) {
      notify('Ilmeni jokin ongelma tarjouksen teossa, yritä myöhemmin uudelleen', 'error')
    }
    };

    if (!user || !customerInfo || (user.id !== customerInfo.targetDeveloper.id
        && user.id !== customerInfo.sender.id)) {
        return (
            <LoginSuggestion />
        )
    }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '70vh', 
        marginTop: '5rem' }}>
            <Typography sx={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem' }}>Chat</Typography>
            <Box>
                {customerInfo.messages.length > 0 ? (
                    customerInfo.messages.map(mes => {
                        return (
                            <Box key={mes.id} sx={{ display: 'flex', justifyContent: user.id === mes.user ? 'flex-end' : 'flex-start', marginBottom: '1rem' }}>
                                <Box sx={{ padding: '0.5rem', backgroundColor: user.id === mes.user ? '#B0D0FF' : '#ccb6f2', color: 'black', maxWidth: '70vw',
                                marginLeft: user.id === mes.user ? '0.5rem' : '0rem', marginRight: user.id === mes.user ? '0rem' : '0.5rem',
                                borderRadius: user.id === mes.user ? '0.5rem 0.5rem 0.1rem 1rem' : '0.5rem 0.5rem 1rem 0.1rem'
                                }}>
                                    <Typography sx={{ whiteSpace: 'break-spaces' }}>{mes.content}</Typography>
                                    <Typography sx={{ fontSize: '0.7rem', textAlign: user.id === mes.user ? 'right' : 'left' }}>{mes.user === user.id ? user.name : (user.id === customerInfo.sender.id ? customerInfo.targetDeveloper.name : customerInfo.sender.name)}</Typography>
                                </Box>
                            </Box>
                        )
})
                ) : (
                    <Typography>Ei viestejä</Typography>
                )}
            </Box>
            <Box sx={{ padding: '1rem', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            type="text"
                            multiline
                            minRows={1}
                            maxRows={5} 
                            value={message}
                            placeholder="Kirjoita viesti"
                            required
                            onChange={({ target }) => setMessage(target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        {!isSmallScreen ? (
                            <Button
                            onClick={handleSendMessage}
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            fullWidth
                            sx={{ textAlign: 'center' }}
                        >
                            Lähetä
                        </Button>
                        ): (
                            <IconButton onClick={handleSendMessage} color="primary">
                                <SendIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Chat