import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import Menubar from '../../Components/MenuBar/Menubar'
import Sidebar from '../../Components/MenuBar/Sidebar'

const DashbordLayout = ({ children }) => {
    return (
        <Box>
            <Menubar />
            <Grid container sx={{ mt: '55px' }}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item>
                    <Container>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashbordLayout