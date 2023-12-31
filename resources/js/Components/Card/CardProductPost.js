import React from 'react'
import { Card, CardContent, CardHeader, CardMedia, CardActions, Grid,  Stack, Button, Typography, Avatar, Paper } from '@mui/material'
import { Favorite, Comment, AccountCircle, FavoriteBorderOutlined } from "@mui/icons-material";
import { Link } from "@inertiajs/inertia-react";

const CardProductPost = ({ username, user, product, productUrl, liked, avatar }) => {
    const productName = product.name.split(' ').join('_')
    return (
        <Card>
            <Link
                href={`/profile/${username}`}
                style={{ fontWeight: 900, textDecoration: "none", color: "#fff" }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} src={avatar ? `${avatar}/${user.avatar}` : <AccountCircle />} />
                    }
                    title={`${user.firstname} ${user.lastname}`}
                    subheader={
                        <Typography variant='body' color='text.thirdy'>
                            {product.created_at}
                        </Typography>
                    }
                />
            </Link>
            <CardContent >
                <Typography variant="h5">
                    {product.name}
                </Typography>
            </CardContent>
            <Link href={`/product/show/${productName}`}>
                <CardMedia
                    component='img'
                    image={`${productUrl}/${username}/${product.asset}`} />
            </Link>
            
            <CardActions>
                <Paper sx={{width:"100%"}}>
                    <Grid container>
                        <Grid item xs={8}>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ justifyContent: "end", margin: "5px" }}
                            >
                                <Link href={`/product/is-liked/${product.id}`} style={{ width: "100%" }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="warning"
                                        startIcon={liked ? <Favorite /> : <FavoriteBorderOutlined />}
                                    >
                                        {product.nomber_like}
                                    </Button>
                                </Link>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<Comment />}
                                >
                                    {product.nomber_comment}
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            {product.price && (
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#fff",
                                        margin: "10px",
                                        justifyContent: "space-between",
                                        textAlign: "justify",
                                    }}
                                >
                                    <img
                                        src="/logos_ethereum.png"
                                        alt="Ethereum"
                                        style={{ width: "14px", height: "23px" }}
                                    />
                                    <span style={{ margin: 0, padding: 0 }}> {product.price} ETH</span>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </CardActions>
        </Card>
    )
}

export default CardProductPost