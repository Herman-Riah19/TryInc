import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import CardPost from "../../Components/Card/CardPost"
import CardProduct from "../../Components/Card/CardProduct"
import CardUserProfile from '../../Components/Card/CardUserProfile'
import Parallax from "../../Components/Parallax"
import Footer from "../../Components/Footer/Footer"
import CardCategorie from "../../Components/Card/CardCategorie"
import Navbar from "../../Components/MenuBar/Navbar"
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles(() => ({
    section: {
        position: 'relative',
        width: 'auto',
        bgcolor: 'white',
        margin: '50px'
    },
    title: {
        position: 'relative',
        fontSize: '32px',
    },
    userSection: {
        mt: '50px',
        mb: '50px',
        width: 'auto'
    }
}))

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

    const classes = useStyle()

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
            <Container sx={{ mt: '70px' }}>
                <Parallax filter image='/img/parallax.jpg'>
                    <Grid container sx={{ zIndex: '1', m: '25px' }}>
                        <Grid item sm={12} md={8}>
                            <Typography variant="h3" sx={{ textAlign: 'left', fontWeight: 700, color: '#fff' }}>
                                Discover, collect, and sell extraordinary NFTs
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'left', fontSize: '25px', fontWeight: 500, color: '#fff' }}>
                                This is the new artiste platform to sell and buy an digital drawing
                            </Typography>
                        </Grid>
                    </Grid>
                </Parallax>

                <Container class={classes.section}>
                    <Typography variant='h3' class={classes.title}>Browse by category</Typography>
                    <Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
                        {categories.map(categ => (
                            <Grid item xs={3} md={3}>
                                <CardCategorie categorie={categ} categorieUrl={categorieUrl} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                <Container class={classes.section}>
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

                <Container class={classes.userSection}>
                    <Typography variant='h3' class={classes.title}>Top of artists</Typography>
                    <Grid container spacing={2}>
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
                </Container>
                <Container class={classes.userSection}>
                    <Typography variant="h3" class={classes.title}>All pictures </Typography>
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
            </Container>
            <Footer />
        </Box>
    )
}