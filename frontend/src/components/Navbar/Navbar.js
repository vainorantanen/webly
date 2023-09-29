import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  createTheme,
  ThemeProvider,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  styled,
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff', // Set the primary color to white
    },
  },
})

const StyledButton = styled(Button)({
  marginLeft: '1rem',
  padding: '0.1rem 1rem 0.1rem 1rem',
  borderRadius: '1rem',
  border: 0,
  color: 'black',
  fontWeight: 'bold',
  boxShadow: 'none',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundImage: 'linear-gradient(to bottom, #C4C4C4, #BCBCBC)' }
})

const Navbar = ({ logout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const user = useSelector(({ user }) => user)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} className='menuiconbutton'>
            <MenuIcon />
          </IconButton>
          <div className='nav-buttons'>
            <StyledButton color="inherit" component={Link} to="/">
              Etusivu
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/kehittajienilmoitukset">
              Kehittäjien ilmoitukset
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/tarjouskilpailut">
              Avoimet ilmoitukset
            </StyledButton>
            {user ? (
              <StyledButton color="inherit" component={Link} to="/lisaailmoitus">
                Lisää ilmoitus
              </StyledButton>
            ) : null}
            {user ? (
              <StyledButton onClick={logout} >
                Kirjaudu ulos
              </StyledButton>
            ) : <StyledButton color="inherit" component={Link} to="/login">
              Kirjaudu
            </StyledButton>}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
        {user && (
            <ListItemText sx={{ marginLeft: '8px' }}>{user.name} kirjautunut</ListItemText>
          )}
          <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Etusivu" />
          </ListItemButton>
          <ListItemButton component={Link} to="/yritykset" onClick={toggleDrawer}>
            <ListItemText primary="Kehittäjät" />
          </ListItemButton>
          <ListItemButton component={Link} to="/yrityksille" onClick={toggleDrawer}>
            <ListItemText primary="Kehittäjille" />
          </ListItemButton>
          <ListItemButton component={Link} to="/blogit" onClick={toggleDrawer}>
            <ListItemText primary="Blogit" />
          </ListItemButton>
          <ListItemButton component={Link} to="/kehittajienilmoitukset" onClick={toggleDrawer}>
            <ListItemText primary="Kehittäjien ilmoitukset" />
          </ListItemButton>
          <ListItemButton component={Link} to="/tarjouskilpailut" onClick={toggleDrawer}>
            <ListItemText primary="Avoimet ilmoitukset" />
          </ListItemButton>
          {user && user.isCompany === false ? (
            <ListItemButton component={Link} to="/lisaailmoitus" onClick={toggleDrawer}>
              <ListItemText primary="Lisää ilmoitus" />
            </ListItemButton>
          ) : null}
          {user && (
            <ListItemButton component={Link} to="/profiili" onClick={toggleDrawer}>
              <ListItemText primary="Profiili" />
            </ListItemButton>
          )}
          {user && (
            <ListItemButton component={Link} to="/portaali" onClick={toggleDrawer}>
              <ListItemText primary="Portaali" />
            </ListItemButton>
          )}
          {!user ? (
            <ListItemButton component={Link} to="/login" onClick={toggleDrawer}>
              <ListItemText primary="Kirjaudu" />
            </ListItemButton>
          ) : <ListItemButton onClick={logout}>
            <ListItemText primary="Kirjaudu ulos" />
          </ListItemButton>}
        </List>
      </Drawer>
    </ThemeProvider>
  )
}

export default Navbar