import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'


const Welcome = () => {
    return (
        <Grid
            item
            container
            xs={10}
            justifyContent="center"
            alignItems="center"
            direction="column"
            wrap="nowrap"
            height={"500px"}
        >
            <Box
                fontWeight={300}
                color="primary.main"
                letterSpacing="0.1em"
                textAlign="center"
                style={{ textTransform: 'uppercase' }}
            >
                <span style={{ fontWeight: 'bold' }}>Try</span>INK
            </Box>
            <Typography sx={(theme) => ({
                marginTop: theme.spacing(1),
                fontSize: 18,
                [theme.breakpoints.down('md')]: {
                    fontSize: 15.3
                },
                marginBottom: theme.spacing(6.5)
            })} variant="p" align="center">
                The ultimate Social Network for the Digital Painter
            </Typography>
            <Grid container item xs={12} spacing={2}>
                <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    justifyContent="flex-end"
                >
                    <Button variant="contained" gradient>
                        Visite
                    </Button>
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <Button variant="outlined" >
                        Get Started
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Welcome