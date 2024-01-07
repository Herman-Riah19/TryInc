import React, { useState, useEffect } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Navbar from "../../Components/MenuBar/Navbar";
import CardProduct from "../../Components/Card/CardProduct";
import Footer from "../../Components/Footer/Footer";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchForm,
  SearchIconWrapper,
  StyledInputBase,
} from "../../Components/MenuBar/SearchInput";

const Search = (props) => {
  const {
    auth,
    avatarUrl,
    bannerUrl,
    authenticateProfile,
    product,
    productUrl,
    otherProducts,
    users,
    keyWord,
    otherUsersProfile,
    profileUser,
    user
  } = props;

  const [search, setSearch] = useState(keyWord);
  const [existProducts, setExistProducts] = useState([])
  const [existUsers, setExistUsers] = useState([])

  const findUserById = (index) => {
    let user = new Object();
    users.map((data) => {
      if (data.id == index) user = data;
    });
    return user;
  };

  const productUser = findUserById(product.user_id);

  useEffect(() => {
    setExistProducts(
      otherProducts.filter((produ) => produ.name.toLowerCase().includes(search)))
  },[search])

  return (
    <Box>
      <Navbar
        auth={auth}
        authAvatar={
          authenticateProfile
            ? `${avatarUrl}/${authenticateProfile.avatar}`
            : null
        }
        keyWord={search}
      />

      <Box sx={{ mt: "70px", ml: "50px", mr:"50px" }}>
        <Box sx={{display: 'flex', m: 2}}>
          <Typography variant="h5" sx={{flexGrow: 1,}}>Results</Typography>
          <SearchForm method="get" sx={{display: 'flex',flexGrow: 1,}}>
            <SearchIconWrapper sx={{ml:1, position: 'relative'}}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              type="search"
              id="keyWord"
              name="keyWord"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </SearchForm>
        </Box>
        <Divider />

        

        {product.name ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CardProduct
                key={product.id}
                product={product}
                username={productUser.username}
                url={productUrl}
              />
            </Grid>
          </Grid>
        ) : (
          <Box>
            <Grid container spacing={2}>
                {existProducts.map((prod) => (
                <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
                  <CardProduct
                    key={prod.id}
                    product={prod}
                    username={findUserById(prod.user_id).username}
                    url={productUrl}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <Footer auth={auth} />
    </Box>
  );
};

export default Search;
