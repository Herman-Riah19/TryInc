import React from 'react'
import { Card, CardActionArea, CardActions, Typography, CardMedia, Button } from '@mui/material'
import { Link } from "@inertiajs/inertia-react"
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles((theme) => ({
    card: {
        backgroundColor: '#0000',
        marginTop: '120px'
    },
    img: {
        height: '300px'
    },
    cardAction: {
        justifyContent: 'space-between',
        textDecoration: 'none',
    },
    title: {
        fontWeight: 700,
        fontStyle: 'bold'
    }
}))

const CardProduct = ({ product, username, url }) => {
    const classes = useStyle()
    return (
        <Card sx={classes.card}>
            <CardActionArea>
                <Link href={`/product/show/${product.id}`}>
                    <CardMedia
                        component="img"
                        className={classes.img}
                        image={`${url}/${username}/${product.asset}`}
                        alt={product.title} />
                </Link>
                <CardActions className={classes.cardAction}>
                    <Typography variant='body2' className={classes.title}>
                        {product.name}
                    </Typography>
                    {product.price != 0 && (
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ color: '#FFF' }}
                            endIcon={<img src='/logos_ethereum.png' style={{ width: '15px' }} />}>
                            {product.price}
                        </Button>
                    )}
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default CardProduct