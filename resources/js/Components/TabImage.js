import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, Grid, Button, Container } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { Info } from '@mui/icons-material'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import CardProduct from './Card/CardProduct'
import { Link } from '@inertiajs/inertia-react'

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: '3px' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const TabImage = ({ products, username, profile, avatar, banner, productUrl }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', m: 0 }}>
            <Box sx={{}}>
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor='secondary'
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleChange}
                    aria-label='Tabulation des images'>
                    <Tab
                        icon={<ImageIcon />}
                        iconPosition="start"
                        label='All'
                        sx={{ textTransform: 'capitalize' }} />
                    <Tab
                        icon={<AutoAwesomeMosaicIcon />}
                        iconPosition="start"
                        label='Collection'
                        sx={{ textTransform: 'capitalize' }} />
                    <Tab
                        icon={<Info />}
                        iconPosition="start"
                        label='About'
                        sx={{ textTransform: 'capitalize' }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2} >
                    {products.map(product => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <CardProduct product={product} username={username} url={productUrl} />
                            </Grid>
                        )
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Link href={'/profile/collection/new'}>
                    <Button variant='contained' color='secondary'>
                        Create a new Collection
                    </Button>
                </Link>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Container sx={{ m: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <img src={`${avatar}/${profile.avatar}`} alt={profile.lastname} style={{ borderRadius: '20px' }} />
                        </Grid>
                        <Grid item md={7}>
                            <Box>
                                <Typography variant='h4' sx={{m:2}}>Informations</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Name : </Typography>
                                    <Typography variant='p'>{profile.lastname}</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Firstname : </Typography>
                                    <Typography variant='p'>{profile.firstname}</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Biographies : </Typography>
                                    <Typography variant='p'>{profile.biography}</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Location : </Typography>
                                    <Typography variant='p'>{profile.location}</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Company : </Typography>
                                    <Typography variant='p'>{profile.company}</Typography>
                                </div>

                                <Typography variant='h4' sx={{m:2}}>Contacts</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Facebook : </Typography>
                                    <a href={profile.facebook_url}>{profile.lastname}</a>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Instagram : </Typography>
                                    <a href={profile.instagram_url}>{profile.lastname}</a>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px' }}>
                                    <Typography variant='h6'>Twitter : </Typography>
                                    <a href={profile.twitter_url}>{profile.lastname}</a>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </TabPanel>
        </Box>
    )
}

export default TabImage