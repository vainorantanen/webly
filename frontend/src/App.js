import React from 'react'
import { useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CompaniesList from './components/CompaniesList'
import CompanyInfoPage from './components/CompanyInfoPage'

import ScrollToTop from './components/ScrollToTop'

import {
  Routes, Route
} from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'

import './App.css'
import { Box } from '@mui/material'

import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import Home from './components/Home/Home'
import Feed from './components/Feed/Feed'
import AddFeedPostForm from './components/Feed/AddFeedPostForm'
import Profile from './components/Profile/Profile'
import SingleFeedPost from './components/Feed/SingleFeedPost'
import ForCompaniesMain from './components/ForCompanies/ForCompaniesMain'
import DevPostFeed from './components/DevelopersPosts/DevPostFeed'
import { useNotification, useInitialization, useClearUser } from './hooks/index'
import { useSelector } from 'react-redux'
import RegisterPage from './components/RegisterPage'

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
})

const App = () => {

  const stateInitializer = useInitialization()
  const notifyWith = useNotification()

  const clearUser = useClearUser()

  const user = useSelector(({ user }) => user)

  useEffect(() => {
    stateInitializer()
  }, [])

  const logout = async () => {
    clearUser()
    notifyWith('Kirjauduttu ulos')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar logout={logout}/>
        <Notification />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/yritykset' element={<CompaniesList />} />
          <Route path='/yritykset/:id' element={<CompanyInfoPage />} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/tarjouskilpailut' element={<Feed />} />
          <Route path='/lisaailmoitus' element={<AddFeedPostForm />} />
          <Route path='/profiili' element={<Profile />} />
          <Route path='/tarjouskilpailut/:id' element={<SingleFeedPost />} />
          <Route path='/yrityksille' element={ <ForCompaniesMain /> } />
          <Route path='/kehittajienilmoitukset' element={<DevPostFeed />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
