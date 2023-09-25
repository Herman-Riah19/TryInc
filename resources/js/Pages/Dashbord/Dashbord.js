import { Grid, Typography, Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DashbordLayout from './DashbordLayout'
import CardProduct from '../../Components/Card/CardProduct'
import CardCategorie from '../../Components/Card/CardCategorie'
import ChartLine from '../../Components/chart/ChartLine'
import ChartBar from '../../Components/chart/ChartBar'

const Dashbord = (props) => {
    const { products, productUrl, users, categories, categorieUrl, auth } = props


    // Données du graphique (ex. : 5 barres)
    const labels = ['Barre 1', 'Barre 2', 'Barre 3', 'Barre 4', 'Barre 5'];
    const data = [20, 35, 15, 45, 25];

    const findUserById = (index) => {
        let user = new Object()
        users.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    return (
        <Container sx={{ mt: '50px', width: 'auto' }}>
            <Container>
                <Grid container>
                    <Grid item>
                        <ChartLine labels={labels} data={data} />
                    </Grid>
                    <Grid item>
                        <ChartBar products={products} />
                    </Grid>
                </Grid>
                

            </Container>
            <Container>
                <Typography variant='h4' sx={{m: 1}}>Categories</Typography>
                <Grid container spacing={2}>
                    {categories.map(categ => (
                        <Grid item xs={6} sm={4} md={3} lg={2}>
                            <CardCategorie categorie={categ} categorieUrl={categorieUrl} auth={auth}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container>
                <Typography variant='h4' sx={{m: 1}}>Liste des Produits</Typography>
                <Grid container spacing={2}>
                    {products.map(product => {
                        const user = findUserById(product.user_id)
                        return (
                            <Grid item xs={12} sm={6} md={5} lg={4}>
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