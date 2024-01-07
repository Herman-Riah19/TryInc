import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import { Comment, Favorite } from "@mui/icons-material";

const classes = {
  card: {
    marginTop: "20px",
  },
  img: {
    height: "300px",
  },
  cardContent: {
    margin: 0,
    justifyContent: "space-between",
  },
  cardAction: {
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 700,
    fontStyle: "bold",
    color: "#fff",
  },
  button: {
    color: "white",
    margin: "10px",
    height: "25px",
  },
};

const CardProduct = ({ key, product, username, url }) => {
  const productName = product.name.split(' ').join('_')
  return (
    <Card key={key} sx={classes.card}>
      <CardActionArea>
        <Link href={`/product/show/${productName}`}>
          <CardMedia
            component="img"
            sx={classes.img}
            image={`${url}/${username}/${product.asset}`}
            alt={product.name}
          />
        </Link>
        <CardActions sx={classes.cardContent}>
          <Grid container>
            <Grid item md={12}>
              <Typography variant="h6" sx={classes.title}>
                {product.name}
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
