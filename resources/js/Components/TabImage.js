import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, Grid, Button, Container } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { Info } from '@mui/icons-material'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import CardProduct from './Card/CardProduct'
import { Link } from '@inertiajs/inertia-react'
import Portfolio from './Portfolio'

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

const TabImage = ({ products, username, profile, avatar, banner, productUrl, collections, collectionUrl }) => {
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
                <Link href={'/collection/new'}>
                    <Button variant='contained' color='secondary'>
                        Create a new Collection
                    </Button>
                </Link>
                <Grid container spacing={2}>
                    {collections.map(collection => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <CardProduct product={collection} username={username} url={collectionUrl} />
                        </Grid>
                    ))}
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