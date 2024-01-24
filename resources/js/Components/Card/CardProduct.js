import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  Paper,
  Stack,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import { Favorite, Comment, AccountCircle, FavoriteBorderOutlined, Share } from "@mui/icons-material";

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
          <Paper sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "end", margin: "5px" }}
                >
                  <Link href={`/product/is-liked/${product.id}`} style={{ width: "100%" }}>
                    <Button
                      fullWidth
                      color="warning"
                      startIcon={<FavoriteBorderOutlined />}
                    >
                      {product.nomber_like}
                    </Button>
                  </Link>
                  <Button
                    fullWidth
                    color="primary"
                    startIcon={<Comment />}
                  >
                    {product.nomber_comment}
                  </Button>
                  <Button
                    fullWidth
                    color="secondary"
                    startIcon={<Share />}
                  >
                    Share
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CardProduct;
