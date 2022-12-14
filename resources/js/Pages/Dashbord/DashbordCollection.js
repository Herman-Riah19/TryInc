import { Box, Grid, TableCell, TableContainer, TableHead, TableRow, Typography, Container, TableBody, Table, Button } from '@mui/material'
import React from 'react'
import Menubar from '../../Components/MenuBar/Menubar'
import Sidebar from '../../Components/Menubar/Sidebar'
import { Inertia } from '@inertiajs/inertia'

const DashbordCollection = (props) => {
    const { products, productUrl, users, categories, categorieUrl } = props

    const findUserById = (index) => {
        let user = new Object()
        users.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    const findCategorieById = (index) => {
        let categorie = new Object()
        categories.map(item => {
            if (item.id == index)
                categorie = item
        })
        return categorie
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
                        <Typography variant='h6'>Liste des Produits</Typography>
                        <TableContainer component='paper'>
                            <Table sx={{ minWidth: 650 }} aria-label="Product table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Action</TableCell>
                                        <TableCell>id</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Categories</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map(product => {
                                        const user = findUserById(product.artiste_id)
                                        const categorie = findCategorieById(product.categorie_id)
                                        return (
                                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>
                                                    <Button 
                                                    onClick={() => Inertia.delete(`/dashbord/collections/${product.id}`)} variant='contained' fullWidth sx={{ mb: '5px' }} color='warning'>Delete</Button> <br />
                                                    <Button variant='contained' fullWidth sx={{ mb: '5px' }} color='success'>Edit</Button>
                                                </TableCell>
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell sx={{ width: '100px' }}>
                                                    <img
                                                        src={`${productUrl}/${user.username}/${product.asset}`}
                                                        style={{ width: '75px', height: '100px' }}
                                                        alt='' />
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.description}</TableCell>
                                                <TableCell>{categorie.name}</TableCell>
                                                <TableCell>{product.price}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashbordCollection