import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Fab,
} from "@mui/material";
import CardPost from "../../Components/Card/CardPost";
import CardProduct from "../../Components/Card/CardProduct";
import CardUserProfile from "../../Components/Card/CardUserProfile";
import Parallax from "../../Components/Parallax/Parallax";
import Footer from "../../Components/Footer/Footer";
import CardCategorieTitle from "../../Components/Card/CardCategorieTitle";
import Navbar from "../../Components/MenuBar/Navbar";
import { Link } from "@inertiajs/inertia-react";
import Title from "../../Components/Title";
import { RssFeed } from "@mui/icons-material";
import { Navigation, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import CardProductPost from "../../Components/Card/CardProductPost";

const style = {
  section: {
    position: "relative",
    width: "auto",
    margin: "50px"
  },
  userSection: {
    mt: "50px",
    mb: "50px",
    width: "auto",
  },
  avatar: {
    boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42)",
    width: "100px",
    height: "100px",
    borderRadius: "50px",
  },
  userList: {
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
  },
};

const slideBreakpoint = {
  425: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  1020: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
};

const slideCategorieBreakpoint = {
  425: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  1920: {
    slidesPerView: 8,
    spaceBetween: 15,
  },
};

export default function Home({
  users,
  posts,
  postUrl,
  products,
  productUrl,
  categories,
  categorieUrl,
  auth,
  authenticateProfile,
  avatarUrl,
  bannerUrl,
  existProfiles,
  likes
}) {
  const [firstColumn, setFirstColumn] = useState([])
  const [secondColumn, setSecondColumn] = useState([])

  const findUserById = (index) => {
    let user = new Object();
    users.map((data) => {
      if (data.id == index) user = data;
    });
    return user;
  };

  const getProfileByUser = (user) => {
    let profile = new Object();
    existProfiles.map((pro) => {
      if (pro.user_id == user.id) profile = pro;
    });
    return profile;
  };

  const findLikedUser = (product) => {
    let liked = false;
    likes.map(like => {
      if (like.product_id === product.id) {
        liked = like.is_liked
      }
    })
    return liked
  }

  useEffect(() => {
    const divisionProducts = () => {
      const product1 = [];
      const product2 = [];

      for (let i = 0; i < products.length; i++) {
        const pair = i % 2;
        if (pair == 0) {
          product1.push(products[i]);
        } else {
          product2.push(products[i]);
        }
      }
      setFirstColumn(product1);
      setSecondColumn(product2);
    }

    divisionProducts();
  }, [])

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
      <Box sx={{ mt: "80px" }}>

        <Box sx={style.section}>
          <Parallax filter image={`img/parallax.jpg`}>
            <Grid container sx={{ zIndex: "1", m: "25px" }}>
              <Grid item md={6}>
                <Typography variant="h4" sx={style.parallaxTitle}>
                  Hi! Welcome to Trynk Application
                </Typography>
                <Typography variant="body2">
                  This is the new Social Media for Every Digital Artists
                  Who can Improuve there Drawing Skill and received the result in there community
                </Typography>
                <Link href={"/posts"}>
                  <Fab
                    variant="extended"
                    size="medium"
                    sx={{ mr: 1 }}
                    color="secondary"
                    aria-label="add"
                  >
                    <RssFeed sx={{ mr: 1 }} /> All Posts
                  </Fab>
                </Link>
              </Grid>
              <Grid item md={4}>
                <Swiper
                  modules={[Navigation, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {posts.map((post) => (
                    <SwiperSlide key={post.id}>
                      <CardPost
                        title={post.title}
                        slug={post.slug}
                        content={post.description}
                        imageUrl={`${postUrl}/${post.post_image}`}
                        classes={{ height: "350px" }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            </Grid>
          </Parallax>
        </Box>

        <Box sx={style.section}>
          <Swiper
            modules={[Navigation, A11y]}
            breakpoints={slideCategorieBreakpoint}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {categories.map((categ) => (
              <SwiperSlide key={categ.id}>
                <CardCategorieTitle
                  categorie={categ}
                  auth={auth}
                  url={categorieUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box sx={style.section}>
          <Title title="Top artist" link="/artist-list" />
          <Swiper
            modules={[Navigation, A11y]}
            breakpoints={slideBreakpoint}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {users.map((artist) => {
              const profile = getProfileByUser(artist);
              return (
                <SwiperSlide key={artist.id}>
                  {artist.role_id != 2 && (
                    <CardUserProfile
                      user={artist}
                      profile={profile}
                      avatarUrl={avatarUrl}
                      bannerUrl={bannerUrl}
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        <Box sx={style.section}>
          <Title title="Top of picture" link="/explores" />
          <Grid container spacing={2}>
            {products.map((product) => {
              const user = findUserById(product.user_id);
              return (
                <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
                  <CardProduct
                    key={product.id}
                    product={product}
                    username={user.username}
                    url={productUrl}
                  />
                </Grid>
                );
                })}
            </Grid>
        </Box>
      </Box>
      <Footer auth={auth} />
    </Box >
  );
}
