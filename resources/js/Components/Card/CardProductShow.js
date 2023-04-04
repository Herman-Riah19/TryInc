import React from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Avatar, Stack, Typography, Grid } from '@mui/material'
import { Link } from '@inertiajs/inertia-react'
import { Download, Favorite, Share, Comment, AccountCircle } from '@mui/icons-material'

const CardProductShow = ({ artiste, avatar, categorieName, product }) => {
    const username = artiste.username.split(' ').join('_')
    return (
        <Card sx={{ height: '40vw' }}>
            <Link href={`/profile/${username}`} style={{ fontWeight: 900, textDecoration: 'none', color: '#fff' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} src={avatar ? avatar : <AccountCircle />} />
                    }
                    title={<Typography variant='h6'>{artiste.username}</Typography>}
                    subheader={<Typography variant='body1' color='text.thirdy'>{categorieName}</Typography>}
                    sx={{ p: '10px', color: '#fff' }}
                />
            </Link>
            <CardContent sx={{ p: '10px' }}>
                <Grid container space={2} columns={{ xs: 2, md: 12 }}>
                    <Grid item xs={12}>
                        <Typography variant='h4' color='text.primary' sx={{ fontWeight: 500, fontSize: 22 }}>
                            {product.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant='p' color='text.thirdy'>
                    {product.description}
                </Typography>
                {product.price && (
                    <Typography variant='h6' sx={{ color: '#fff', margin: '10px', justifyContent: 'space-between', textAlign: 'justify' }}>
                        <img src='/logos_ethereum.png' alt='Ethereum' style={{ width: '14px', height: '23px' }} />
                        <span style={{ margin: 0, padding: 0 }}> {product.price} ETH</span>
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                {/*<Stack direction='row' spacing={2} sx={{ justifyContent: 'end', margin: '5px' }}>
                    <Button variant='outlined' color='warning' startIcon={<Favorite />}>
                        12
                    </Button>
                    <Button variant='outlined' color='success' sx={{ justifyContent: 'space-between' }} startIcon={<Comment />}>
                        Comment
                    </Button>
                    <Link href={`/product/download/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <Button variant='outlined' color='secondary' sx={{ justifyContent: 'space-between' }} startIcon={<Download />}>
                        Download
                        </Button>
                    </Link>
                    <Button variant='outlined' color='primary' sx={{ justifyContent: 'space-between' }} startIcon={<Share />}>
                        Share
                    </Button>
                </Stack>*/}
            </CardActions>
        </Card>
    )
}

export default CardProductShow