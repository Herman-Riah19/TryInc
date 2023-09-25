import { Container, Typography } from '@mui/material'
import React from 'react'
import ChartBar from '../../Components/chart/ChartBar'
import DashbordLayout from './DashbordLayout'

const Statistic = ({products, auth}) => {
  return (
    <Container sx={{ mt: '50px', width: 'auto' }}>
        <Typography variant='h1'>Statistic of activities</Typography>
        <Container>
            <ChartBar products={products}/>
        </Container>
    </Container>
  )
}

Statistic.layout = page => <DashbordLayout children={page}/>
export default Statistic