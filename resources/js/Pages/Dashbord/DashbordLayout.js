import React, { useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import Menubar from '../../Components/MenuBar/Menubar'
import Sidebar from '../../Components/MenuBar/Sidebar'

const DashbordLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen)
    }
    return (
        <Box>
            <Menubar onClick={handleMenuClick} />
            <Grid container sx={{ mt: '55px' }}>
                <Grid item md={2}>
                    <Sidebar isOpen={sidebarOpen}/>
                </Grid>
                <Grid item md={10}>
                    <Container>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashbordLayout