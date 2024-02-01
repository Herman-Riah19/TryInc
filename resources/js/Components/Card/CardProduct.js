import React from "react";
import {
  Card,
  CardActions,
  Paper,
  CardMedia,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import { FavoriteBorderOutlined } from "@mui/icons-material";

const classes = {
  card: {
    marginTop: "20px",
    cardContent: {
      display:"block",
      margin: 0,
      justifyContent: "space-between",
    },
  },
  img: {
    height: "300px",
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
        <Link href={`/product/show/${productName}`}>
          <CardMedia
            component="img"
            sx={classes.img}
            image={`${url}/${username}/${product.asset}`}
            alt={product.name}
          />
        </Link>
        <CardActions sx={classes.card.cardContent}>
          <Paper sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontSize: '15px', fontWeight: 300, mt:'5px' }}
                >
                  {product.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                  
                  <Link href={`/product/is-liked/${product.id}`} style={{ width: "100%" }}>
                    <Button
                      fullWidth
                      color="warning"
                      startIcon={<FavoriteBorderOutlined />}
                    >
                      {product.nomber_like}
                    </Button>
                  </Link>
              </Grid>
            </Grid>
          </Paper>
        </CardActions>
    </Card>
  );
};

export default CardProduct;
