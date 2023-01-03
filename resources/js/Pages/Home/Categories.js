import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/MenuBar/Navbar';
import SidebarHome from '../../Components/MenuBar/SidebarHome';
import CardProduct from "../../Components/Card/CardProduct";
import Footer from '../../Components/Footer/Footer';

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
            <Grid container sx={{mt:'75px', height: "50rem"}}>
                <Grid item sx={(theme) => ({
                    [theme.breakpoints.up('xs')]: { display: 'none' },
                    [theme.breakpoints.up('md')]: { display: 'block' }
                })}
                    xs={0} sm={0} md={3} lg={3}>
                    <SidebarHome categories={categories} categorieUrl={categorieUrl} />
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Container>
                        <Typography variant='h5' >List of {categorie.name} style</Typography>
                        <Grid container spacing={2}>
                            {products.map(product => {
                                const user = findUserById(product.artiste_id)
                                return (
                                    <Grid item xs={12} sm={5} md={4} lg={3}>
                                        <CardProduct product={product} username={user.username} url={productUrl} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    )
}

export default Categories

/**
 * 15 * 6 000
 * 1 * 20 000: Boky => Teneno ilay izy, Ambarao ilay Izy, Raiso ilay izy 
 * 20 000
 * 5 * 6 000: TBP
 * 3 * 5 000 : Fiderana
 * 20 000: Montre
 */