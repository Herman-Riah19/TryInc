import React from "react";
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
import CardCategorie from "../../Components/Card/CardCategorie";
import Navbar from "../../Components/MenuBar/Navbar";
import { Link } from "@inertiajs/inertia-react";
import Title from "../../Components/Title";
import { RssFeed } from "@mui/icons-material";
import { Navigation, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import HomeParallax from "../../Components/Parallax/HomeParallax";

const style = {
  section: {
    position: "relative",
    width: "auto",
    margin: "25px",
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
}) {
  const findUserById = (index) => {
    let user = new Object();
    users.map((data) => {
      if (data.id == index) user = data;
    });
    return user;
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
    1020: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  };

  const getProfileByUser = (user) => {
    let profile = new Object();
    existProfiles.map((pro) => {
      if (pro.user_id == user.id) profile = pro;
    });
    return profile;
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
      <Container sx={{ mt: "80px" }}>
        <Container sx={style.section}>
          <HomeParallax users={users} existProfiles={existProfiles} avatarUrl={avatarUrl} bannerUrl={bannerUrl} />
        </Container>

        <Container sx={style.section}>
          <Title title="Categories list" link="/categorie/Illustration" />

          <Swiper
            modules={[Navigation, A11y]}
            breakpoints={slideCategorieBreakpoint}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {categories.map((categ) => (
              <SwiperSlide>
                <CardCategorie
                  categorie={categ}
                  categorieUrl={categorieUrl}
                  auth={auth}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>

        <Container sx={style.section}>
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
                <SwiperSlide>
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
        </Container>

        <Container sx={style.section}>
          <Parallax filter image={`img/parallax.jpg`}>
            <Grid container sx={{ zIndex: "1", m: "25px" }}>
              <Grid item md={6}>
                <Typography variant="h4" sx={style.parallaxTitle}>
                  All of our post
                </Typography>
                <Typography variant="body2">
                  In this section You can see every blog post about our
                  community and more information about us.
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
                    <SwiperSlide>
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
        </Container>

        <Container sx={style.section}>
          <Title title="Top of picture" link="/explores" />
          <Grid container spacing={2}>
            {products.map((product) => {
              const user = findUserById(product.user_id);
              return (
                <Grid item xs={12} sm={5} md={4} lg={3}>
                  <CardProduct
                    product={product}
                    username={user.username}
                    url={productUrl}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>

        <Container sx={style.section}>
          <Title title="Blog post" link={"/posts"} />
          <Swiper
            modules={[Navigation, A11y]}
            breakpoints={slideBreakpoint}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {posts.map((post) => (
              <SwiperSlide>
                <CardPost
                  title={post.title}
                  slug={post.slug}
                  content={post.description}
                  imageUrl={`${postUrl}/${post.post_image}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Container>
      <Footer auth={auth} />
    </Box>
  );
}
