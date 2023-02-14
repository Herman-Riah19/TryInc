import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Navbar from '../../Components/MenuBar/Navbar';
import CardProduct from "../../Components/Card/CardProduct";
import Title from '../../Components/Title';
import CardCategorie from '../../Components/Card/CardCategorie';
import Footer from '../../Components/Footer/Footer';

const style = {
    section: {
        position: 'relative',
        width: 'auto',
        margin: '10px'
    },
}

const Categories = (props) => {
    const { auth, avatarUrl, authenticateProfile, categorie, categories, categorieUrl, products, productUrl, artists } = props;

    const findUserById = (index) => {
        let user = new Object()
        artists.map((data) => {
            if (data.id == index)
                user = data
        })
        return user
    }

    return (
        <Box>
            <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
            <Container sx={{ mt: '100px'}}>
                <Container sx={style.section}>
                    <Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
                        {categories.map(categ => (
                            <Grid item xs={3} md={3}>
                                <CardCategorie categorie={categ} categorieUrl={categorieUrl} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container sx={style.section}>
                    <Grid container spacing={2}>
                        {products.map(product => {
                            const user = findUserById(product.artiste_id)
                            return (
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <CardProduct product={product} username={user.username} url={productUrl} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Container>
            <Footer auth={auth} />
        </Box>
    )
}

export default Categories