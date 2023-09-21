import React from 'react'
import { Grid, Box, Typography, Button, ButtonGroup, Card, CardHeader, CardContent, TableContainer, TableBody, TableRow, TableCell, CardMedia } from '@mui/material'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'

const Portfolio = ({ profile, avatar }) => {
    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Card sx={{m: '1vw'}}>
                    <CardMedia
                        component="img"
                        image={`${avatar}/${profile.avatar}`}
                        alt={profile.lastname} />
                </Card>
                <ButtonGroup fullWidth variant='contained' orientation='vertical' color='secondary' aria-label="Contacts">
                    <Button endIcon={<Facebook />}>
                        <a href={profile.facebook_url}>Facebook</a>
                    </Button>

                    <Button endIcon={<Instagram />}>
                        <a href={profile.instagram_url}>Instagram</a>
                    </Button>
                    <Button endIcon={<Twitter />}>
                        <a href={profile.twitter_url}>Twitter</a>
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item md={7}>
                <Box>
                    <Card sx={{m:'1vw'}}>
                        <CardHeader title='About me' />
                        <CardContent>
                            <Typography variant='p' color="text.thirdy">{profile.biography}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{m:'1vw'}}>
                        <CardHeader title="Personnal Informations"/>
                        <CardContent>
                            <TableContainer >
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='h6'>Lastname </Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>{profile.lastname}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='h6'>Firstname </Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>{profile.firstname}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='h6'>Location </Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>{profile.location}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='h6'>Company </Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell sx={{border: 'none'}}>
                                            <Typography variant='p'>{profile.company}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Portfolio