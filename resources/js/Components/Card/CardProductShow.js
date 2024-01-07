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
  InputBase,
  IconButton,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { Link } from "@inertiajs/inertia-react";
import { Favorite, Comment, AccountCircle, FavoriteBorderOutlined, ExpandMore } from "@mui/icons-material";
import { useForm } from "@inertiajs/inertia-react";
import CardComment from "./CardComment";

const CardProductShow = ({ profile, artiste, avatarUrl, categorieName, product, liked, comments,profileComments,users  }) => {
  const { data, setData, errors, post } = useForm({
    name: 'New comment',
    body: '',
  })

  const username = artiste.username.split(" ").join("_");

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
    <Card sx={{ MinHeight: "40vw" }}>
      <Link
        href={`/profile/${username}`}
        style={{ fontWeight: 900, textDecoration: "none", color: "#fff" }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "red" }}
              src={profile.avatar ? `${avatarUrl}/${profile.avatar}` : <AccountCircle />}
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
        </Grid>
        <Typography variant="p" color="text.thirdy">
          {product.description}
        </Typography>
        
      </CardContent>
      <CardActions>
          <Grid container>
            <Grid item xs={4}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "end", margin: "5px" }}
              >
                <Link href={`/product/is-liked/${product.id}`}>
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={liked ? <Favorite /> : <FavoriteBorderOutlined />}
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
            <Grid item xs={4}>
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
      <CardActions>
        
        <Box>
          <Accordion sx={{ mt: '25px' }}>
            <AccordionSummary sx={{ color: 'white' }} expandIcon={<ExpandMore />}>
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
                  multiline
                />
                <IconButton type="submit" sx={{ p: '10px', color: 'white' }} onClick={handleComment}>
                  <Comment />
                </IconButton>
              </Paper>
            </AccordionSummary>
            <AccordionDetails>
              <CardComment id={`${product.id}`} users={users} comments={comments} profileComments={profileComments} assetUrl={avatarUrl} />
            </AccordionDetails>
          </Accordion> 
        </Box> 
      </CardActions>
    </Card>
  );
};

export default CardProductShow;
