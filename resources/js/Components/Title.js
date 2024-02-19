import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { Link } from '@inertiajs/inertia-react'
import { ArrowCircleRight } from '@mui/icons-material';

const style = theme => ({
    title: {
        position: 'relative',
        margin: '10px'
    },
    titleButton: {
        height: '50px',
        margin: '10px', 
        borderRadius: "50%"
    },
})
const Title = ({title, link}) => {
    return (
        <Grid container sx={{ justifyContent: 'space-between', m: 3 }}>
            <Typography variant='h4' sx={style.title}>{title}</Typography>
            {link && (
                <Button 
                    variant='outlined' 
                    color='secondary' 
                    sx={style.titleButton} 
                    endIcon={<ArrowCircleRight />}>
                    <Link href={link}>View all</Link>
                </Button>
            )}
        </Grid>
    )
}

export default Title