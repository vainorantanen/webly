import { Box } from '@mui/material'
import React from 'react'
import HomeHeader from './HomeHeader'
import FAQSection from './FaqSection'
import HomeInfoBox from './HomeInfoBox'
import ComputerTab from './ComputerTab'
import HomeProcessChoose from './HomeProcessChoose'

const Home = () => {
  return (
    <Box>
      <HomeHeader />
      <ComputerTab />
      <HomeProcessChoose />
      <HomeInfoBox />
      <FAQSection />
    </Box>
  )
}

export default Home