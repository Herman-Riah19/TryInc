import React from 'react'
import { Card, CardHeader, CardContent, TableContainer, TableBody, TableCell, TableRow, Typography } from '@mui/material'
const CardPersonalInformation = (props) => {
    const { profile } = props
  return (
      <Card sx={{ m: '1vw' }}>
          <CardHeader title="Personnal Informations" />
          <CardContent>
              <TableContainer >
                  <TableBody>
                      <TableRow>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='h6'>Lastname </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>:</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>{profile.lastname}</Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='h6'>Firstname </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>:</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>{profile.firstname}</Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='h6'>Location </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>:</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>{profile.location}</Typography>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='h6'>Company </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>:</Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none' }}>
                              <Typography variant='p'>{profile.company}</Typography>
                          </TableCell>
                      </TableRow>
                  </TableBody>
              </TableContainer>
          </CardContent>
      </Card>
  )
}

export default CardPersonalInformation