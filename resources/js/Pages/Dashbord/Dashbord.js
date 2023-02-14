import { Grid, Typography, Container } from '@mui/material'
import React from 'react'
import DashbordLayout from './DashbordLayout'
import CardProduct from '../../Components/Card/CardProduct'
import CardCategorie from '../../Components/Card/CardCategorie'

const Dashbord = (props) => {
    const { products, productUrl, users, categories, categorieUrl } = props

    const findUserById = (index) => {
        let user = new Object()
        users.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    return (
        <Container sx={{ m: '10px', width: 'auto' }}>
            <Container>
                <Typography variant='h6'>Categories</Typography>
                <Grid container spacing={2} columns={{ xs: 4, md: 8 }}>
                    {categories.map(categ => (
                        <Grid item xs={4} md={4}>
                            <CardCategorie categorie={categ} categorieUrl={categorieUrl} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container>
                <Typography variant='h6'>Liste des Produits</Typography>
                <Grid container spacing={2} sx={{maxWidth: 900}} columns={{ xs: 4, md: 8 }}>
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
    )
}

Dashbord.layout = page => <DashbordLayout children={page} />

export default Dashbord