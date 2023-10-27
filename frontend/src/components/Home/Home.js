import { Box } from '@mui/material'
import React from 'react'
import HomeHeader from './HomeHeader'
import FAQSection from './FaqSection'
import HomeInfoBox from './HomeInfoBox'
import HomeProcessChoose from './HomeProcessChoose'

const Home = () => {
  return (
    <Box>
      <HomeHeader />
      <HomeProcessChoose />
      <HomeInfoBox />
      <FAQSection />
    </Box>
  )
}

export default Home