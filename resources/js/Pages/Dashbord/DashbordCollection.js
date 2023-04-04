import { TableCell, TableContainer, TableHead, TableRow, Typography, Container, TableBody, Table, Button } from '@mui/material'
import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import DashbordLayout from './DashbordLayout'
import { Delete } from '@mui/icons-material'

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
        <Container sx={{ mt: '50px', width: 'auto' }}>
            <Typography variant='h4'>Liste des Produits</Typography>
            <TableContainer component='paper'>
                <Table sx={{ maxWidth: 900 }} aria-label="Product table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Categories</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => {
                            const user = findUserById(product.user_id)
                            const categorie = findCategorieById(product.categorie_id)
                            return (
                                <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                                    <TableCell>
                                        <Button
                                            onClick={() => Inertia.delete(`/dashbord/collections/${product.id}`)}
                                            variant='contained'
                                            fullWidth
                                            sx={{ mb: '5px', color: 'white' }}
                                            color='warning'
                                            endIcon={<Delete />}>
                                            Delete
                                        </Button> 
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

DashbordCollection.layout = page => <DashbordLayout children={page} />

export default DashbordCollection