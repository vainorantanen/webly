import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useDispatch, useSelector } from 'react-redux'
import { useNotification } from '../../hooks'
import { modifyBidApprovedState, removBidFromFeedPost } from '../../reducers/feedPosts'

const FeedBidCard = ({ bid }) => {

  const dispatch = useDispatch()
  const notifyWith = useNotification()

  const user = useSelector(({ user }) => user)
  const projectPost = useSelector(({ feedPosts }) => feedPosts).find(p => p.id === bid.id)

  const handleAcceptbid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti hyväksyä tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(modifyBidApprovedState(bidId, projectPost.id))
      notifyWith('Tarjous hyväksytty', 'success')
    } catch (error) {
      notifyWith('Tarjouksen hyväksyntä epäonnistui', 'error')
    }

  }

  const handleDeletebid = async (bidId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tämän tarjouksen?')
    if (!confirmed) {
      return // If the user clicks "Cancel," do nothing
    }
    try {
      dispatch(removBidFromFeedPost(bidId, projectPost.id))
      notifyWith('Poistettu onnistuneesti', 'success')
    } catch (error) {
      notifyWith('Tarjouksen poisto epäonnistui', 'error')
    }

  }

  if (!projectPost) {
    return <Typography>Ei mitää</Typography>
  }

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1rem', marginBottom: '1rem' }}>
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
      {user && user.id === projectPost.user.id && !bid.isApproved ? (
              <Button onClick={() => handleAcceptbid(bid.id)}>Hyväksy tarjous</Button>
            ): null}
            {user && (user.id === projectPost.user.id || user.id === bid.user) && (
              <Button sx={{ color: 'red' }} onClick={() => handleDeletebid(bid.id)}>Poista tarjous</Button>
            )}
    </Box>
  )
}

export default FeedBidCard