import React from 'react'
import { useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CompaniesList from './components/Companies/CompaniesList'
import CompanyInfoPage from './components/Companies/CompanyInfoPage'

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
import ModifyBuyerPost from './components/Profile/ModifyBuyerPost'
import ModifyDevPost from './components/Profile/ModifyDevPost'
import ModifyPortalPost from './components/Profile/ModifyPortalPost'
import Portal from './components/Portal/Portal'
import SinglePostPortalView from './components/Portal/SinglePostPortalView'
import AddBlogForm from './components/Blogs/AddBlogForm'
import AddRatingForm from './components/RatingForm/AddRatingForm'
import AllBlogsList from './components/Blogs/AllBlogsList'
import SingleBlogView from './components/Blogs/SingleBlogView'

const theme = createTheme({
  typography: {
    fontFamily: 'Lato'
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
          <Route path='/profiili/kayttaja/muokkaa/ilmoitus/:id' element={<ModifyBuyerPost />} />
          <Route path='/profiili/kayttaja/muokkaa/portaaliilmoitus/:id' element={<ModifyPortalPost />} />
          <Route path='/profiili/kehittaja/muokkaa/ilmoitus/:id' element={<ModifyDevPost />} />
          <Route path='/portaali' element={<Portal />} />
          <Route path='/portaali/ilmoitukset/:id' element={<SinglePostPortalView />} />
          <Route path='/tarjouskilpailut/:id' element={<SingleFeedPost />} />
          <Route path='/yrityksille' element={ <ForCompaniesMain /> } />
          <Route path='/kehittajienilmoitukset' element={<DevPostFeed />} />
          <Route path='/lisaa-blogi' element={<AddBlogForm />} />
          <Route path='/anna-arvostelu/:id' element={<AddRatingForm />} />
          <Route path='/blogit' element={<AllBlogsList />} />
          <Route path='/blogit/:id' element={<SingleBlogView /> } />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
