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

const CardProduct = ({ product, username, url }) => {
  return (
    <Card sx={classes.card}>
      <CardActionArea>
        <Link href={`/product/show/${product.id}`}>
          <CardMedia
            component="img"
            sx={classes.img}
            image={`${url}/${username}/${product.asset}`}
            alt={product.name}
          />
        </Link>
        <CardActions sx={classes.cardContent}>
          <Grid container>
            <Grid item md={8}>
              <Typography variant="h6" sx={classes.title}>
                {product.name}
              </Typography>
            </Grid>
            <Grid item md={3}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<Favorite />}
              >
                {product.nomber_like}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
