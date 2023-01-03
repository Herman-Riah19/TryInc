import { Box, Grid, TableCell, TableContainer, TableHead, TableRow, Typography, Container, TableBody, Table } from '@mui/material'
import React from 'react'
import Menubar from '../../Components/MenuBar/Menubar'
import Sidebar from '../../Components/Menubar/Sidebar'
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
        <Box>
            <Menubar />
            <Grid container sx={{ mt: '55px' }}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <Container>
                        <Typography variant='h6'>Categories</Typography>
                        <Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
                            {categories.map(categ => (
                                <Grid item xs={2} md={2}>
                                    <CardCategorie categorie={categ} categorieUrl={categorieUrl} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    <Container>
                        <Typography variant='h6'>Liste des Produits</Typography>
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

                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashbord