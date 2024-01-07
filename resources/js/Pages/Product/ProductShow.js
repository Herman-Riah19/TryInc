import React from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  Paper,
  CardMedia,
  Card} from "@mui/material";
import Navbar from "../../Components/MenuBar/Navbar";
import CardProduct from "../../Components/Card/CardProduct";
import CardProductShow from "../../Components/Card/CardProductShow";
import { makeStyles } from "@mui/styles";
import Footer from "../../Components/Footer/Footer";
import { useForm } from "@inertiajs/inertia-react";

const styles = makeStyles(() => ({
  imgShow: {
    width: "35vw",
    height: "40vw",
    borderRadius: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "25px",
    fontWeight: 800,
  }
}));
const ProductShow = ({
  product,
  auth,
  liked,
  assetUrl,
  artist,
  profile,
  avatarUrl,
  categorie,
  otherProducts,
  users,
  authenticateProfile,
  comments, profileComments,
}) => {
  const classes = styles();
  const { data, setData, errors, post} = useForm({
    name: 'New comment',
    body: '',
  })

  const findUserById = (index) => {
    let user = new Object();
    users.map((data) => {
      if (data.id == index) user = data;
    });
    return user;
  };

  return (
    <Box>
      <Navbar
        auth={auth}
        authAvatar={
          authenticateProfile
            ? `${avatarUrl}/${authenticateProfile.avatar}`
            : null
        }
      />
      <Container sx={{ mt: "100px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            sx={{ justifyContent: "space-between" }}
          >
            <Card>
              <CardMedia
                component="img"
                sx={classes.img}
                image={`${assetUrl}/${artist.username}/${product.asset}`}
                alt={product.name}/>
            </Card>
             
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <Paper>
              <CardProductShow
                profile={profile}
                artiste={artist}
                liked={liked}
                avatarUrl={avatarUrl}
                categorieName={categorie.name}
                product={product}
                assetUrl={avatarUrl}
                comments={comments}
                profileComments={profileComments}
                users={users}
              />           
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ margin: "10px" }}>
          <Typography variant="h2" class={classes.title}>
            More from the same categorie
          </Typography>
          <hr />
          <Grid container spacing={2}>
            {otherProducts.map((item) => {
              const user = findUserById(item.user_id);
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardProduct
                    key={item.id}
                    product={item}
                    username={user.username}
                    url={assetUrl}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Footer auth={auth} />
    </Box>
  );
};

export default ProductShow;
