import React from 'react'
import { Grid, Box, Typography, Button, ButtonGroup, Card, CardHeader, CardContent, TableContainer, TableBody, TableRow, TableCell, CardMedia } from '@mui/material'
import { Facebook, Instagram, Twitter } from '@mui/icons-material'
import CardAboutUser from './Card/CardAboutUser'
import CardPersonalInformation from './Card/CardPersonalInformation'

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
                    <CardAboutUser biography={profile.biography} />
                    <CardPersonalInformation profile={profile}/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Portfolio