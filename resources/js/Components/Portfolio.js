import React from 'react'
import { Grid, Box, Typography, Button, ButtonGroup, Card, CardHeader, CardContent, TableContainer, TableBody, TableRow, TableCell } from '@mui/material'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'

const Portfolio = ({ profile, avatar }) => {
    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <img src={`${avatar}/${profile.avatar}`} alt={profile.lastname} style={{ borderRadius: '20px' }} />
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
                    <Card>
                        <CardHeader title='About me' />
                        <CardContent>
                            <Typography variant='p'>{profile.biography}</Typography>

                            <Typography variant='h5'>Personnal Informations</Typography>
                            <TableContainer >
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h6'>Lastname </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>{profile.lastname}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h6'>Firstname </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>{profile.firstname}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h6'>Location </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>{profile.location}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h6'>Company </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant='p'>:</Typography>
                                        </TableCell>
                                        <TableCell>
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