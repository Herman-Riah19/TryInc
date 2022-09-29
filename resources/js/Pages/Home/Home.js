import React from "react"
import { Box, Grid, Container, Button, Typography } from '@mui/material'
import Navbar from "../../Components/MenuBar/Navbar"
import CardPost from "../../Components/Card/CardPost"
import { Link } from "@inertiajs/inertia-react"
import CardProduct from "../../Components/Card/CardProduct"
import CardUser from '../../Components/Card/CardUser'
import Parallax from "../../Components/Parallax"
import { presentationStyle } from "../../Style/component/presentationStyle"

const Home = ({ users, posts, postUrl, products, productUrl, auth, avatar, avatarUrl, existProfiles }) => {
  
  const classes = presentationStyle()

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
      <Navbar auth={auth} avatar={`${avatarUrl}/${avatar}`}/>
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
          <Grid item sm={3} md={2}>
            <img 
              style={{ 
                width: '250px', 
                height: '250px', 
                borderRadius: '15px', 
                boxShadow: '0px 3px 6px rgba(100, 116, 139, 0.12)' }} 
              src='/img/exemple.jpg' alt='this is an exemple NFT' />
          </Grid>
        </Grid>
      </Parallax>
      <Container sx={{ position: 'absolute', height: '100%', bgcolor: 'white', borderRadius: '15px' }}>
        {auth.guards.web.isLoggedIn && (
          <Grid spacing={2} columns={{ xs: 4, md: 12 }} sx={{ margin: '25px' }}>
            <Link href="/product/create" style={{textDecoration: 'none'}}>
              <Button variant="contained">Publish new Product</Button>
            </Link>
          </Grid>
        )}
        <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
          {posts.map(post => (
            <Grid item xs={4} md={4}>
              <CardPost
                title={post.title}
                content={post.description}
                imageUrl={`${postUrl}/${post.post_image}`} />
            </Grid>
          ))}
        </Grid>

        <Container 
          sx={{ 
            mt: '50px', 
            mb: '50px', 
            background: 'linear-gradient(to right, #283593, #5c6bc0)', 
            width: '100%' }}>
          <Typography variant='h3' className={classes.title}>Top of artists</Typography>
          <Grid container spacing={2}>
            {existProfiles.map(artist => {
              const user = findUserById(artist.user_id)

              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardUser user={user} avatar={`${avatarUrl}/${artist.avatar}`} />
                </Grid>
              )
            })}
          </Grid>
        </Container>
        <Container>
          <Typography variant="h3" sx={classes.title}>All pictures </Typography>
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
        <Container>
        </Container>
      </Container>
    </Box>
  )
}

export default Home