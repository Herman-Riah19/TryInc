import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, Grid } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { Foundation, Info } from '@mui/icons-material'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import CardProduct from './Card/CardProduct'

function TabPanel(props) {
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

const TabImage = ({ products, username, productUrl }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider ' }}>
                <Tabs value={value} onChange={handleChange} aria-label='Tabulation des images'>
                    <Tab
                        icon={<ImageIcon />}
                        iconPosition="start"
                        label='All' />
                    <Tab
                        icon={<AutoAwesomeMosaicIcon />}
                        iconPosition="start"
                        label='Collection' />
                    <Tab
                        icon={<Info />}
                        iconPosition="start"
                        label='About' />
                    <Tab
                        icon={<Foundation />}
                        iconPosition="start"
                        label='Illustration' />
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
                Item two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Tree
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
        </Box>
    )
}

export default TabImage