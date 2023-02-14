import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Navbar from "../../Components/MenuBar/Navbar"
import Parallax from '../../Components/Parallax'
import Footer from "../../Components/Footer/Footer"

const PostShow = ({ post, auth, posts, postUrl, avatarUrl, authenticateProfile }) => {
  return (
    <Box>
      <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
      <Container sx={{ mt: '70px' }}>
        <Parallax filter image={`${postUrl}/${post.post_image}`}>
          <Container sx={{ textAlign: 'center', zIndex: '1', m: '25px' }}>
            <Typography variant='h4' color='white'>{post.title}</Typography>
          </Container>
        </Parallax>
        <Box sx={{ m: '50px' }}>
          <Container>
            <Typography variant='p'>{post.description}</Typography>
            <Typography dangerouslySetInnerHTML={{ __html: post.body}} variant='body' />
          </Container>
        </Box>
      </Container>
      <Footer auth={auth} />
    </Box>
  )
}

export default PostShow