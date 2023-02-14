import React from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Grid, Typography, Button } from '@mui/material'
import { Link } from '@inertiajs/inertia-react'

const style = {
    title: {
        position: 'relative',
        fontSize: '32px',
        margin: '20px'
    },
    titleButton: {
        height: '50px',
        margin: '20px', 
        borderRadius: '10px 0px 10px 0px'
    },
}
const Title = ({title, link}) => {
    return (
        <Grid container sx={{ justifyContent: 'space-between' }}>
            <Typography variant='h3' sx={style.title}>{title}</Typography>
            <Button variant='contained' color='secondary' sx={style.titleButton} endIcon={<ArrowCircleRightIcon />}>
                <Link href={link}>Look all</Link>
            </Button>
        </Grid>
    )
}

export default Title