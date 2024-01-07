import React from 'react'
import { Box, Grid } from '@mui/material'
import Navbar from '../../Components/MenuBar/Navbar'
import Title from '../../Components/Title'
import CardPost from '../../Components/Card/CardPost'
import Footer from '../../Components/Footer/Footer'

const style = {
    section: {
        position: 'relative',
        width: 'auto',
        margin: '50px'
    },
}

const PostList = ({ auth, posts, postUrl, avatarUrl, authenticateProfile }) => {
    return (
        <Box>
            <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
            <Box sx={{ mt: '70px' }}>
                <Box sx={style.section}>
                <Title title='Blog post'/>
                    <Grid container spacing={2} >
                        {posts.map(post => (
                            <Grid item xs={12} sm={6} md={4}>
                                <CardPost
                                    slug={post.slug}
                                    title={post.title}
                                    content={post.description}
                                    imageUrl={`${postUrl}/${post.post_image}`} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Footer auth={auth} />
        </Box>
    )
}

export default PostList