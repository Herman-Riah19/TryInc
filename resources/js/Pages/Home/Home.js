import React from 'react'
import { Box, Container, Grid, Typography, Fab } from '@mui/material'
import CardPost from "../../Components/Card/CardPost"
import CardProduct from "../../Components/Card/CardProduct"
import CardUserProfile from '../../Components/Card/CardUserProfile'
import Parallax from "../../Components/Parallax"
import Footer from "../../Components/Footer/Footer"
import CardCategorie from "../../Components/Card/CardCategorie"
import Navbar from "../../Components/MenuBar/Navbar"
import { Link } from "@inertiajs/inertia-react"
import Title from '../../Components/Title'
import { Category, SupervisorAccount } from '@mui/icons-material'
import CardUser from '../../Components/Card/CardUser'

const style = {
    section: {
        position: 'relative',
        width: 'auto',
        margin: '25px'
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
    },
    userList: {
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
    }
}

export default function Home({ users, posts, postUrl, products, productUrl, categories, categorieUrl, auth, authenticateProfile, avatarUrl, bannerUrl, existProfiles }) {

    const findUserById = (index) => {
        let user = new Object()
        users.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    return (
        <Box>
            <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
            <Container sx={{ mt: '80px' }}>
                <Container sx={style.section}>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <Parallax filter image={`img/parallax.jpg`} >
                                <Grid container sx={{ zIndex: '1', m: '25px' }}>
                                    <Grid item sm={12} md={9}>
                                        <Typography variant="h4" sx={style.parallaxTitle}>
                                            Discover, collect, and sell extraordinary NFTs
                                        </Typography>
                                        <Typography variant='body2'>
                                            This is the new artiste platform to sell and buy an digital drawing
                                        </Typography>

                                        <Link href={`/categorie/Illustration`} >
                                            <Fab variant="extended" size="medium" sx={{mr: 1}} color="secondary" aria-label="add">
                                                <Category sx={{ mr: 1 }}/> All Categories
                                            </Fab>
                                        </Link>
                                        <Link href={`/artist-list`} >
                                        <Fab variant="extended" size="medium" sx={{mr:1,color: 'white'}} color="warning" aria-label="add">
                                               <SupervisorAccount sx={{mr:1}} /> All artist Creator
                                            </Fab>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Parallax>
                        </Grid>
                    </Grid>
                </Container>

                <Container sx={style.section}>
                    <Title title='Categories list' link='/categorie/Illustration' />
                    <Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
                        {categories.map(categ => (
                            <Grid item xs={3} md={3}>
                                <CardCategorie categorie={categ} categorieUrl={categorieUrl} auth={auth} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                <Container sx={style.section}>
                        <Title title='Top artist' link='/artist-list' />
                        <Grid container spacing={2} sx={{ padding: 2 }}>
                            {users.map(artist => {
                                let profile = new Object()
                                existProfiles.map(pro => {
                                    if (pro.user_id == artist.id)
                                        profile = pro
                                })
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                                        {artist.role_id != 2 &&
                                            <CardUserProfile
                                                user={artist}
                                                profile={profile}
                                                avatarUrl={avatarUrl}
                                                bannerUrl={bannerUrl} />
                                        }
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                </Container>

                <Container sx={style.section}>
                    <Title title='Top of picture' link='/collection' />
                    <Grid container spacing={2}>
                        {products.map(product => {
                            const user = findUserById(product.user_id)
                            return (
                                <Grid item xs={12} sm={5} md={4} lg={3}>
                                    <CardProduct product={product} username={user.username} url={productUrl} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>

                <Container sx={style.section}>
                    <Title title='Blog post' link={'/posts'} />
                    <Grid container spacing={4} columns={{ xs: 4, md: 12 }}>
                        {posts.map(post => (
                            <Grid item xs={4} md={4}>
                                <CardPost
                                    title={post.title}
                                    slug={post.slug}
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