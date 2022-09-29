import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import Navbar from '../../Components/MenuBar/Navbar'
import CardProduct from '../../Components/Card/CardProduct'
import CardProductShow from '../../Components/Card/CardProductShow'

const ProductShow = ({ product, auth, assetUrl, artist, profile, avatarUrl, categorie, otherProducts, users,currentProfile }) => {

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
      <Navbar auth={auth} avatar={currentProfile && `${avatarUrl}/${currentProfile.avatar}`}/>
      <Container sx={{ marginTop: '80px' }}>
        <Grid container spacing={2} columns={{xs: 4, md: 12}}>
          <Grid item xs={4} md={5} sm={6}>
            <img
              style={{ maxWidth: '500px', maxHeight: '500px', borderRadius: '20px' }}
              src={`${assetUrl}/${artist.username}/${product.asset}`}
              alt={product.name} />
          </Grid>
          <Grid item xs={4} md={6} sm={6}>
            <CardProductShow
              artiste={artist}
              avatar={`${avatarUrl}/${profile.avatar}`}
              categorieName={categorie.name}
              product={product} />
          </Grid>
        </Grid>
        <Box sx={{ margin: '10px' }}>
          <Typography variant='h2'>More from the same categorie</Typography>
          <Grid container spacing={2}>
            {otherProducts.map(item => {
              const user = findUserById(item.artiste_id)
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardProduct product={item} username={user.username} url={assetUrl}/>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default ProductShow