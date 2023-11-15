import React from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  InputBase,
  IconButton,
  Paper, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  Card} from "@mui/material";
import Navbar from "../../Components/MenuBar/Navbar";
import CardProduct from "../../Components/Card/CardProduct";
import CardProductShow from "../../Components/Card/CardProductShow";
import { makeStyles } from "@mui/styles";
import Footer from "../../Components/Footer/Footer";
import CardComment from "../../Components/Card/CardComment";
import { useForm } from "@inertiajs/inertia-react";
import {Comment, ExpandMore } from "@mui/icons-material";

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

  const handleChange = (event) => {
    const key = event.target.id
    const value = event.target.value
    setData(values => ({
      ...values,
      [key]: value
    }))
  }

  const handleComment = (event) => {
    console.log("comment button clicked: " + event.target.value)
    post(`/product/show/${product.id}`, data)
  }

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
                artiste={artist}
                liked={liked}
                avatar={`${avatarUrl}/${profile.avatar}`}
                categorieName={categorie.name}
                product={product}
                assetUrl={avatarUrl}
              />
              
              <Accordion>
                <AccordionSummary sx={{color:'white'}} expandIcon={<ExpandMore/>}>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                  method='post' 
                >
                  <InputBase
                    id="body"
                    name="body"
                    value={data.body}
                    onChange={handleChange} 
                    error={errors?.body}
                    helperText={errors?.body && errors?.body}
                    sx={{ ml: 1, flex: 1, width: "100%" }}
                    placeholder="Add Comment"
                    inputProps={{ 'aria-label': 'Add comment' }}
                  />
                  <IconButton type="submit" sx={{ p: '10px', color:'white'}}  onClick={handleComment}>
                    <Comment />
                  </IconButton>
                </Paper>
                </AccordionSummary>
                <AccordionDetails>
                  <CardComment id={`${product.id}`} users={users} comments={comments} profileComments={profileComments} assetUrl={avatarUrl}/>
                </AccordionDetails>
              </Accordion>              
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
