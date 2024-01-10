import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, Grid, Button, ButtonGroup, Container, Paper } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { Info, Facebook, Instagram, Twitter } from '@mui/icons-material'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import CardProduct from './Card/CardProduct'
import Portfolio from './Portfolio'
import CardProductPost from './Card/CardProductPost'
import CardAboutUser from './Card/CardAboutUser'
import CardPersonalInformation from './Card/CardPersonalInformation'

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

const TabImage = ({ likes, products, username, profile, avatar, productUrl }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue);
    };

    const findLikedUser = (product) => {
        let liked = false
        likes.map(like => {
            if(like.product_id == product.id){
                liked = true
            }
        })
        return liked
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{}}>
                <Paper>
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
                            label='Actuality'
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
                </Paper>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <CardAboutUser biography={profile.biography}/>
                        <CardPersonalInformation profile={profile}/>
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
                    <Grid item md={8}>
                        {products.map(prod =>{
                            const liked = findLikedUser(prod)
                            return (
                                <Grid item xs={12} sx={{ mt: "15px" }}>
                                    <CardProductPost
                                        liked={liked}
                                        username={username}
                                        user={profile}
                                        product={prod}
                                        productUrl={productUrl}
                                        avatar={avatar} />
                                </Grid>
                            )
                        } )}
                    </Grid>
                </Grid>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
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
            <TabPanel value={value} index={2}>
                <Container sx={{ m: 2 }}>
                    <Portfolio profile={profile} avatar={avatar} />
                </Container>
            </TabPanel>
        </Box>
    )
}

export default TabImage