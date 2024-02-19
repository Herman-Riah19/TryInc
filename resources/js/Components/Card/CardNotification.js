import React from 'react'
import { Card, CardHeader, Typography } from '@mui/material'
const CardNotification = () => {
  return (
    <Card sx={{width: "100%"}}>
          <CardHeader title={<Typography variant="small">Notification</Typography>} subheader="Comment"/>
    </Card>
  )
}

export default CardNotification