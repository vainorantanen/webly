import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const FormSummary = () => {
  const data = useSelector(state => state.formData)

  return (
    <Box>
      {/* <Typography variant="h6">Perustiedot</Typography>
      <Typography variant="body1">{data.description}</Typography>
      <Typography variant="h6">Ilmoituksen ehdot</Typography>
      <Typography variant="body1">Päivämäärä: {data.date}</Typography>
      <Typography variant="body1">Aukiolo: {data.isOpen ? 'Auki' : 'Suljettu'}</Typography>
      <Typography variant="body1">Minimihinta: {data.minPrice}</Typography>
      <Typography variant="body1">Maksimihinta: {data.maxPrice}</Typography>
      <Typography variant="h6">Yhteenveto</Typography>
      <Typography variant="body1">Kysymys 1: {data.question1}</Typography>
      <Typography variant="body1">Kysymys 2: {data.question2}</Typography>
      <Typography variant="body1">Kysymys 3: {data.question3}</Typography>
      <Typography variant="body1">Kysymys 4: {data.question4}</Typography>
      <Typography variant="body1">Kysymys 5: {data.question5}</Typography> */}
      moi
    </Box>
  )
}

export default FormSummary