import React from 'react'
import { Avatar, Box, Card, CardActions, CardHeader, Container, Grid, Button, Paper, Typography, AppBar } from '@mui/material'
import CardPost from "../../Components/Card/CardPost"
import CardProduct from "../../Components/Card/CardProduct"
import CardUserProfile from '../../Components/Card/CardUserProfile'
import Parallax from "../../Components/Parallax"
import Footer from "../../Components/Footer/Footer"
import CardCategorie from "../../Components/Card/CardCategorie"
import Navbar from "../../Components/MenuBar/Navbar"
import { Link } from "@inertiajs/inertia-react"
import Title from '../../Components/Title'

const style = {
    section: {
        position: 'relative',
        width: 'auto',
        margin: '50px'
    },
    userSection: {
        mt: '50px',
        mb: '50px',
        width: 'auto'
    },
    avatar: {
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42)",
        width: '100px',
        height: '100px',
        borderRadius: '50px',
    },
    parallaxTitle: {
        textAlign: 'left',
        fontWeight: 700,
        color: '#fff',
        textTransform: 'capitalize'
    }
}

export default function Home({
    users,
    posts,
    postUrl,
    products,
    productUrl,
    categories,
    categorieUrl,
    auth,
    authenticateProfile,
    avatarUrl,
    bannerUrl,
    existProfiles
}) {

    const findUserById = (index) => {
        let user = new Object()
        users.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    const profileUser = findUserById(existProfiles[1].user_id)

    return (
        <Box>
            <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
            <Container sx={{ mt: '100px' }}>
                <Container sx={style.section}>
                    <Parallax filter image={`${bannerUrl}/${existProfiles[1].banner}`} >
                        <Grid container sx={{ zIndex: '1', m: '25px' }}>
                            <Grid item sm={12} md={8}>
                                <Typography variant="h3" sx={style.parallaxTitle}>
                                    {existProfiles[1].biography}
                                </Typography>
                                <Card sx={{ bgcolor: 'transparent', border: 'none' }}>
                                    <CardActions>
                                        <Link href={`/profile/${profileUser.username.split(' ').join('_')}`}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        alt={`${existProfiles[1].lastname} ${existProfiles[1].firstname}`}
                                                        sx={style.avatar}
                                                        src={`${avatarUrl}/${existProfiles[1].avatar}`} />
                                                }
                                                title={<Typography variant='h6'>{`${existProfiles[1].lastname} ${existProfiles[1].firstname}`}</Typography>}
                                                subheader={<Typography variant='body2'>{` ${existProfiles[1].company} : ${existProfiles[1].location}`}</Typography>}
                                                sx={{ p: '10px', color: '#fff' }} />
                                        </Link>
                                    </CardActions>
                                </Card>

                                <Typography variant="body2" sx={{ textAlign: 'left', fontSize: '25px', fontWeight: 500, color: '#fff' }}>

                                </Typography>
                            </Grid>
                        </Grid>
                    </Parallax>
                </Container>

                <Container sx={style.section}>
                    <Title title='Categories list' link='/categorie/Illustration' />
                    <Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
                        {categories.map(categ => (
                            <Grid item xs={3} md={3}>
                                <CardCategorie categorie={categ} categorieUrl={categorieUrl} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                <Container sx={style.section}>
                    <Paper elevation={0} sx={{ padding: 5, color: '#fff' }}>
                        <Title title='Top artist' link='/artist-list' />
                        <Grid container spacing={4} columns={{ xs: 4, md: 12 }}>
                            {users.map(artist => {
                                let profile = new Object()
                                existProfiles.map(pro => {
                                    if (pro.user_id == artist.id)
                                        profile = pro
                                })
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <CardUserProfile
                                            user={artist}
                                            profile={profile}
                                            avatarUrl={avatarUrl}
                                            bannerUrl={bannerUrl} />
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    </Paper>
                </Container>



                <Container sx={style.section}>
                    <Title title='Top of picture' link='/collection' />
                    <Grid container spacing={2}>
                        {products.map(product => {
                            const user = findUserById(product.artiste_id)
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <CardProduct product={product} username={user.username} url={productUrl} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>

                <Container sx={style.section}>
                    <Title title='Blog post' />
                    <Grid container spacing={4} columns={{ xs: 4, md: 12 }}>
                        {posts.map(post => (
                            <Grid item xs={4} md={4}>
                                <CardPost
                                    title={post.title}
                                    content={post.description}
                                    imageUrl={`${postUrl}/${post.post_image}`} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Container>
            <Footer auth={auth} />
        </Box>
    )
}