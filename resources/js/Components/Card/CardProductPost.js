import React from 'react'
import { Card, CardHeader, CardMedia, CardActions, Grid,  Stack, Button, Typography, Avatar, Paper } from '@mui/material'
import { Favorite, Comment, AccountCircle, FavoriteBorderOutlined, Share } from "@mui/icons-material";
import { Link } from "@inertiajs/inertia-react";

const CardProductPost = ({ username, user, product, productUrl, liked, avatar }) => {
    const productName = product.name.split(' ').join('_')
    const dateCreation = product.created_at.split("T")[0]
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
                    title={<Typography variant="h6">{user.firstname} {user.lastname}</Typography>}
                    subheader={dateCreation}
                />
            </Link>
            <Link href={`/product/show/${productName}`}>
                <CardMedia
                    component='img'
                    image={`${productUrl}/${username}/${product.asset}`} />
            </Link>
            
            <CardActions>
                <Paper sx={{width:"100%"}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ justifyContent: "end", margin: "5px" }}
                            >
                                <Link href={`/product/is-liked/${product.id}`} style={{ width: "100%" }}>
                                    <Button
                                        fullWidth
                                        color="warning"
                                        startIcon={liked ? <Favorite /> : <FavoriteBorderOutlined />}
                                    >
                                        {product.nomber_like}
                                    </Button>
                                </Link>
                                <Button
                                    fullWidth
                                    color="primary"
                                    startIcon={<Comment />}
                                >
                                    {product.nomber_comment}
                                </Button>
                                <Button
                                    fullWidth
                                    color="secondary"
                                    startIcon={<Share />}
                                >
                                    Share
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </CardActions>
        </Card>
    )
}

export default CardProductPost