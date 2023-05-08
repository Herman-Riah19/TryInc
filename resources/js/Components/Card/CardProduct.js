import React from 'react'
import { Card, CardActionArea, CardActions, Typography, CardMedia, Button, Box, CardContent } from '@mui/material'
import { Link } from "@inertiajs/inertia-react"
import { Comment, Favorite } from '@mui/icons-material'

const classes = {
    card: {
        marginTop: '20px',
    },
    img: {
        height: '300px'
    },
    cardContent: {
        display: 'flex',
        margin: 0,
        justifyContent: 'space-between',
        textDecoration: 'none',
    },
    cardAction: {
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 700,
        margin: '12px',
        fontStyle: 'bold',
        color: '#fff'
    },
    button: {
        color: 'white',
        margin: '10px',
        height: '25px'
    }
}

const CardProduct = ({ product, username, url }) => {
    return (
        <Card sx={classes.card}>
            <CardActionArea>
                <Link href={`/product/show/${product.id}`}>
                    <CardMedia
                        component="img"
                        sx={classes.img}
                        image={`${url}/${username}/${product.asset}`}
                        alt={product.name} />
                </Link>
                <CardContent sx={classes.cardContent}>
                    <Typography variant='body' sx={classes.title}>
                        {product.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardProduct