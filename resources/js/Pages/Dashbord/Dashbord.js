import { Grid, Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,Button } from '@mui/material'
import React from 'react'
import DashbordLayout from './DashbordLayout'
import CardCategorie from '../../Components/Card/CardCategorie'
import ChartLine from '../../Components/chart/ChartLine'
import ChartBar from '../../Components/chart/ChartBar'
import { Inertia } from '@inertiajs/inertia'
import { Delete } from '@mui/icons-material'

const Dashbord = (props) => {
    const { products, productUrl, users, categories, categorieUrl, auth } = props

    const tableHeaderTexts = ['id','Image', 'Name', 'Nombre like', 'Description', 'Categorie', 'Price', 'Action']

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
                <TableContainer component='paper'>
                    <Table sx={{ maxWidth: 900 }} aria-label="Product table">
                        <TableHead>
                            <TableRow>
                                {tableHeaderTexts.map(item => <TableCell>{item}</TableCell>)}
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
                                    <TableCell>{product.nomber_like}</TableCell>
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
        </Container>
    )
}

Dashbord.layout = page => <DashbordLayout children={page} />

export default Dashbord