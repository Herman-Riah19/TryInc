import React from 'react'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import Navbar from '../../Components/MenuBar/Navbar'
import CardProduct from "../../Components/Card/CardProduct"

const Search = (props) => {
    const { auth, avatarUrl, authenticateProfile, products, productUrl, users } = props

    console.log(products)
    const findUserById = (index) => {
        let user = new Object()
        users.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    const user = findUserById(products.artiste_id)


    return (
        <Box>
            <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />

            <Container sx={{ mt: '70px' }}>
                <Typography variant='h5'>Results</Typography>
                <Divider />

                <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <CardProduct product={products} username={user.username} url={productUrl} />
                            </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Search