import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import Navbar from "../../Components/MenuBar/Navbar";
import CardProduct from "../../Components/Card/CardProduct";
import CardProductShow from "../../Components/Card/CardProductShow";
import { makeStyles } from "@mui/styles";
import Footer from "../../Components/Footer/Footer";

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
            md={4}
            lg={5}
            sx={{ justifyContent: "space-between" }}
          >
            <img
              class={classes.imgShow}
              src={`${assetUrl}/${artist.username}/${product.asset}`}
              alt={product.name}
            />
          </Grid>
          <Grid item sm={12} md={8} lg={7}>
            <CardProductShow
              artiste={artist}
              avatar={`${avatarUrl}/${profile.avatar}`}
              categorieName={categorie.name}
              product={product}
              comments={comments}
              profileComments={profileComments}
              assetUrl={avatarUrl}
            />
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
