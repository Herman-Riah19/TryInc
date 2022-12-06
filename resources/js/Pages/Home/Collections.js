import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../Components/MenuBar/Navbar'
import CardProduct from "../../Components/Card/CardProduct"
import Footer from '../../Components/Footer/Footer'

const Collections = ({ auth, avatarUrl, authenticateProfile, products, productUrl, users }) => {

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
      <Container sx={{mt: '70px'}}>
      <Typography variant="h5">All pictures </Typography>
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
      <Footer />
    </Box>
  )
}

export default Collections