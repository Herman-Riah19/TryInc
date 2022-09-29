import React from 'react'
import { Card, CardActionArea, CardActions, Typography, CardMedia, Button } from '@mui/material'
import { Link } from "@inertiajs/inertia-react"

const CardProduct = ({product, username, url}) => {
  return (
    <Card>
        <CardActionArea>
            <Link href={`/product/show/${product.id}`}>
                <CardMedia 
                    component="img" 
                    sx={{height: '300px'}} 
                    image={`${url}/${username}/${product.asset}`} 
                    alt={product.title}/>
            </Link>
            <CardActions sx={{ justifyContent: 'space-between', textDecoration: 'none'}}>
                <Typography variant='body2' sx={{fontWeight: 700, fontStyle: 'bold'}}>
                    {product.name}
                </Typography>
                <Button variant='contained' endIcon={<img src='/logos_ethereum.png' style={{width: '15px'}}/>}>
                    {product.price}
                </Button>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}

export default CardProduct