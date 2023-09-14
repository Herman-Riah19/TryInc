import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import { Favorite, Comment, AccountCircle } from "@mui/icons-material";

const CardProductShow = ({ artiste, avatar, categorieName, product }) => {
  
  const username = artiste.username.split(" ").join("_");

  return (
    <Card sx={{ MinHeight: "40vw" }}>
      <Link
        href={`/profile/${username}`}
        style={{ fontWeight: 900, textDecoration: "none", color: "#fff" }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "red" }}
              src={avatar ? avatar : <AccountCircle />}
            />
          }
          title={<Typography variant="h5">{artiste.username}</Typography>}
          subheader={
            <Typography variant="body2" color="text.thirdy">
              {artiste.email}
            </Typography>
          }
          sx={{ p: "10px", color: "#fff" }}
        />
      </Link>
      <CardContent sx={{ p: "10px", height: "30vw" }}>
        <Grid container space={2} columns={{ xs: 2, md: 12 }}>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: 500, fontSize: 22 }}
            >
              {product.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "end", margin: "5px" }}
            >
              <Link href={`/product/is-liked/${product.id}`}>
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<Favorite />}
                >
                  {product.nomber_like}
                </Button>
              </Link>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Comment />}
                >
                  {product.nomber_comment}
                </Button>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="p" color="text.thirdy">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item>
          <Link href={`/categorie/${categorieName}`}>
              <Typography
                variant="body1"
                color="secondary"
                border={1}
                borderRadius={50}
                textAlign={"center"}
                padding={1}
              >
                {categorieName}
              </Typography>
            </Link>
            {product.price && (
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  margin: "10px",
                  justifyContent: "space-between",
                  textAlign: "justify",
                }}
              >
                <img
                  src="/logos_ethereum.png"
                  alt="Ethereum"
                  style={{ width: "14px", height: "23px" }}
                />
                <span style={{ margin: 0, padding: 0 }}> {product.price} ETH</span>
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CardProductShow;
