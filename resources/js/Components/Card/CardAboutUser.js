import React from 'react'
import { Card, CardHeader, CardContent, Typography } from "@mui/material"

const CardAboutUser = ({ biography }) => {
  return (
      <Card sx={{ m: '1vw' }}>
          <CardHeader title='About me' />
          <CardContent>
              <Typography variant='p' color="text.thirdy">{biography}</Typography>
          </CardContent>
      </Card>
  )
}

export default CardAboutUser