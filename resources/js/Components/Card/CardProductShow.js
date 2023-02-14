import React from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Avatar, Stack, Typography, Grid } from '@mui/material'
import { Link } from '@inertiajs/inertia-react'
import { Favorite, Share } from '@mui/icons-material';

const CardProductShow = ({ artiste, avatar, categorieName, product }) => {
    const username = artiste.username.split(' ').join('_')
    return (
        <Card>
            <Link href={`/profile/${username}`} style={{fontWeight: 900, textDecoration: 'none', color: '#fff'}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} src={avatar}/>
                    }
                    title={<Typography variant='h6' color='text.thirdy'>{artiste.username}</Typography>}
                    subheader={<Typography variant='body2' color='text.thirdy'>{categorieName}</Typography>}
                    sx={{p:'10px', color: '#fff'}}
                />
            </Link>
            <CardContent sx={{p:'10px'}}>
                <Grid container space={2} columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={7} md={7}>
                        <Typography variant='span' color='text.thirdy' sx={{ fontWeight: 500, fontSize: 22 }}>
                            {product.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Stack direction='row' spacing={1} sx={{ justifyContent: 'end', margin: '5px' }}>
                            <Button variant='contained' color='warning' sx={{color:'#FFF'}} startIcon={<Favorite />}>12</Button>
                            <Button variant='contained' color='secondary' sx={{color:'#FFF'}} startIcon={<Share />}>Share</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Typography variant='p' color='text.thirdy'>
                    {product.description}
                </Typography>
                <Typography variant='h6' sx={{ color: '#fff', margin: '10px', justifyContent: 'space-between', textAlign: 'justify' }}>
                    <img src='/logos_ethereum.png' alt='Ethereum' style={{ width: '14px', height: '23px' }} />
                    <span style={{ margin: 0, padding: 0 }}> {product.price} ETH</span>
                </Typography>
            </CardContent>
            <CardActions>
                    <Button variant='contained' color='secondary' fullWidth>
                        <Link href={`/product/download/${product.id}`} style={{textDecoration: 'none', color: 'white'}}>
                            Buy Now
                        </Link>
                    </Button>
            </CardActions>
        </Card>
    )
}

export default CardProductShow