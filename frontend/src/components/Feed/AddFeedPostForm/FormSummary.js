import { Container, Paper, Typography } from "@mui/material"
import dayjs from 'dayjs'
import { useSelector } from "react-redux"

const FormSummary = () => {
  const formData = useSelector(state => state.formData)
  console.log('data', formData)
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem'
      }}
    >
      <Paper sx={{display: 'flex', flexDirection: "column", padding: '2rem', justifyContent: 'center', alignItems: 'begin' }}>
        <Typography variant="h4">Perustiedot</Typography>
        <Typography>Sivun tarkoitus: {formData.question1}</Typography>
        <Typography>Kohdeyleisö: {formData.question2 === 'other' ? formData.question2Other : formData.question2}</Typography>
        <Typography>Teknologiset rajoitteet: {formData.question3 === 'other' ? formData.question3Other : formData.question3}</Typography>
        <Typography>Sisälönhallinta: {formData.question4}</Typography>
        <Typography>Toiminnallisuus: {formData.question5}</Typography>
        <Typography>Muuta: {formData.other}</Typography>

        <Typography variant="h4" >Ehdot</Typography>
        <Typography>Tarjouskilpailun takaraja: {dayjs(formData.date).format('DD.MM.YYYY')}</Typography>
        <Typography>Ilmoitus on auki: {formData.isOpen === 'true' ? 'Kyllä' : formData.isOpen === 'false' ? 'Ei' : 'Ei määritelty'}</Typography>
        <Typography>Hintahaarukka: {formData.minPrice}€ - {formData.maxPrice}€</Typography>
      </Paper>
    </Container>
  )
}

export default FormSummary