import { Box, Container, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { updateUserDisabledState } from '../../reducers/users'

const AdminPanel = () => {
    const user = useSelector(({user}) => user)
    const users = useSelector(({users}) => users)
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5

    const notifyWith = useNotification()
  const dispatch = useDispatch()

    useEffect(() => {
        setCurrentPage(1)
      }, [])

      const filteredUsers = users.filter(u => u.username !== 'admin')

    if (!user || user.username !== 'admin') {
        return (
            <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
                <Typography>Error loading user</Typography>
            </Container>
        )
    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleDisableUser = (user) => {
      const state = user.disabled ? 'enabled' : 'disabled'
      const confirmed = window.confirm(`Haluatko varmasti asettaa käyttäjän tilaan: ${state}?`)
      if (!confirmed) {
        return // If the user clicks "Cancel," do nothing
      }
        try {
          dispatch(updateUserDisabledState(user))
          notifyWith('Päivitetty onnistuneesti', 'success')
        } catch (error) {
          notifyWith('Epäonnistui', 'error')
        }
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>Admin paneeli</Typography>
        <Typography sx={{ fontSize: '1.2rem', borderBottom: '1px solid white' }}>Hallinnoi alustan käyttäjiä</Typography>
        {currentUsers && currentUsers.length > 0 ? (
            currentUsers.map(u => (
                <Box sx={{ margin: '0.5rem', backgroundColor: 'lightgray', color: 'black',
                padding: '0.5rem', borderRadius: '0.5rem' }} key={u.id}>
                    <Typography sx={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{u.name}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row',
                 flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around' }}>
                    <Box>
                        <Typography>Käyttäjänimi: {u.username}</Typography>
                        <Typography>Email: {u.email}</Typography>
                        <Typography>Käyttäjätyyppi: {u.userType}</Typography>

                    </Box>
                    {u.userType === 'regular' && (
                      <Box>
                      <Typography>Feedposteja yhteensä: {u.feedPosts.length}</Typography>
                      <Typography>Portaalipostauksia: {u.portalPosts.length}</Typography>
                  </Box>
                    )}
                    {u.userType !== 'regular' && (
                      <Box>
                      <Typography>Feed tarjouksia yhteensä: {u.feedBids.length}</Typography>
                      <Typography>Portaalitarjouksia: {u.portalBids.length}</Typography>
                      <Typography>Blogeja: {u.blogs.length}</Typography>
                  </Box>
                    )}
                    <Box>
                        <Typography>Annettuja arvosteluja: {u.givenRatings.length}</Typography>
                        <Typography>Saatuja arvosteluja: {u.ratings.length}</Typography>
                    </Box>
                    <Box sx={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <Typography>Hallinnoi</Typography>
                        {u.userType !== 'regular' && (
                                                  <Typography><Button component={Link} to={`/kehittajat/${u.id}`}>Siirry profiiliin</Button></Typography>
                        )}
                        {u.disabled ? (
                          <Typography><Button onClick={() => handleDisableUser(u)}>Enabloi käyttäjä</Button></Typography>
                        ) : (
                          <Typography><Button onClick={() => handleDisableUser(u)}>Disabloi käyttäjä</Button></Typography>
                        )}
                        <Typography><Button sx={{ color: 'red' }}>Poista käyttäjä</Button></Typography>
                    </Box>
                </Box>
                </Box>
            ))
        ): (
            <Typography>Ei käyttäjiä alustalla</Typography>
        )}
         {/* Pagination */}
         <Box className="pagination" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
            {Array.from({ length: Math.ceil(filteredUsers.length / postsPerPage) }).map((_, index) => (
              <Button
                sx={{
                  backgroundColor: currentPage === index + 1 ? 'blue' : 'transparent',
                  color: currentPage === index + 1 ? 'white' : 'inherit',
                  ':hover': {
                    backgroundColor: currentPage === index + 1 ? 'blue' : '#8B8FFF',
                  },
                }}
                key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </Box>
    </Container>
  )
}

export default AdminPanel