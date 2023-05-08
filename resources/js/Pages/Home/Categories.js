import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../../Components/MenuBar/Navbar';
import CardProduct from "../../Components/Card/CardProduct";
import CardCategorie from '../../Components/Card/CardCategorie';
import Footer from '../../Components/Footer/Footer';
import Title from '../../Components/Title';

const style = {
    section: {
        position: 'relative',
        width: 'auto',
        margin: '10px'
    },
    parallaxTitle: {
        textAlign: 'left',
        fontWeight: 700,
        color: '#fff',
        textTransform: 'capitalize'
    },
    parallaxSlug: {
        textAlign: 'left',
        fontWeight: 200,
        fontSize: '20px',
        color: '#fff',
        textTransform: 'capitalize'
    },
    banner: {
        position: 'relative',
        height: '15rem',
        width: 'auto',
        marginBottom: '50px',
        backgroundPosition: "center center",
        backgroundSize: "cover",
        overflow: 'hidden',
        "&:before": {
          background: "rgba(0, 0, 0, 0.5)",
        },
        "&:after,&:before": {
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "block",
          left: "0",
          top: "0",
          content: "''",
        },
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
            <Container sx={{ mt: '65px' }}>
                <Container sx={style.section}>
                    <div style={{...style.banner, backgroundImage: `url(${categorieUrl}/${categorie.asset})`}} >
                        <Grid container sx={{ zIndex: '1', m: '50px' }}>
                            <Grid item sm={12} md={8}>
                                <Typography variant="h3" sx={style.parallaxTitle}>
                                    {categorie.name}
                                </Typography>
                                <Typography variant='h5' sx={style.parallaxSlug}>
                                    {categorie.slug}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Typography variant='p' dangerouslySetInnerHTML={{ __html: categorie.description }} />
                </Container>
                
                <Container sx={style.section}>
                    <Title title={`Pictures in ${categorie.name} categorie :`} />
                    <Grid container spacing={2}>
                        {products.map(product => {
                            const user = findUserById(product.user_id)
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <CardProduct product={product} username={user.username} url={productUrl} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
                
                <Container sx={style.section}>
                    <Paper elevation={0} sx={{ padding: 3 }}>
                        <Title title='Other categories' />
                        <Grid container spacing={2} columns={{ xs: 2, md: 12 }}>
                            {categories.map(categ => (
                                <Grid item xs={3} md={3}>
                                    <CardCategorie categorie={categ} categorieUrl={categorieUrl} auth={auth} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Container>
            </Container>
            <Footer auth={auth} />
        </Box>
    )
}

export default Categories