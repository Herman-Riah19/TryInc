import { Link } from '@inertiajs/inertia-react'
import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

const Dashbord = () => {
    return (
        <Box>
            <Button variant='contained'>
                <Link href={'/dashbord/categorie/create'} style={{textDecoration: 'none', color: 'white'}}>
                    Create Categorie
                </Link>
            </Button>
        </Box>
    )
}

export default Dashbord