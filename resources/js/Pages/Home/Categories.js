import React from 'react';
import { Avatar, Box, Container, Grid, ListItemAvatar, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import Navbar from '../../Components/MenuBar/Navbar';
import CardProduct from "../../Components/Card/CardProduct";
import Footer from '../../Components/Footer/Footer';
import Title from '../../Components/Title';
import { Link } from '@inertiajs/inertia-react'

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

    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }
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
            
                <Grid container sx={{ mt: '65px' }}>
                    <Grid item md={2} sx={{ mb: "500px" }}>
                        <MenuList sx={theme => ({
                            position: 'fixed',
                            background: '#18181C',
                            zIndex: 1,
                            height: '50rem',
                            transition: 'width 2s',
                            display: open ? 'block' : 'none',
                            [theme.breakpoints.down('md')]: {
                                display: open ? 'none' : 'block'
                            },
                            [theme.breakpoints.up('sm')]: {
                                display: open ? 'block' : 'none'
                            }
                        })}>
                            {categories.map(categ => (
                                <MenuItem key={categ.id} sx={{ m: 1, p: 2, color: 'white' }}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img src={`${categorieUrl}/${categ.asset}`} alt={categ.name} />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <Link href={`/categorie/${categ.name.split(' ').join('_')}`}>
                                        <ListItemText primary={categ.name} secondary={categ.slug} />
                                    </Link>
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Grid>
                    <Grid item md={10}>
                        <Container >
                            <Container sx={style.section}>
                                <div style={{ ...style.banner, backgroundImage: `url(${categorieUrl}/${categorie.asset})` }} >
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
                        </Container>
                        <Footer auth={auth} />
                    </Grid>
                </Grid>
        </Box>
    )
}

export default Categories