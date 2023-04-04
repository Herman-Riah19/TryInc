import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import Navbar from '../../Components/MenuBar/Navbar'
import Title from '../../Components/Title'
import CardPost from '../../Components/Card/CardPost'
import Footer from '../../Components/Footer/Footer'

const style = {
    section: {
        position: 'relative',
        width: 'auto',
        margin: '10px'
    },
}

const PostList = ({ auth, posts, postUrl, avatarUrl, authenticateProfile }) => {
    return (
        <Box>
            <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
            <Container sx={{ mt: '70px' }}>
                <Container sx={style.section}>
                <Title title='Blog post'/>
                    <Grid container spacing={2} >
                        {posts.map(post => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <CardPost
                                    slug={post.slug}
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

export default PostList