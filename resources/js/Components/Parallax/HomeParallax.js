import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Parallax from "./Parallax";
import { Link } from "@inertiajs/inertia-react";
import { CardHeader, Avatar, Card, Grid, Typography, Fab } from "@mui/material";
import { AccountCircle, Category } from "@mui/icons-material";
import { Navigation, A11y } from "swiper";

const HomeParallax = ({ users, existProfiles, avatarUrl, bannerUrl }) => {
  const getProfileByUser = (user) => {
    let profile = new Object();
    existProfiles.map((pro) => {
      if (pro.user_id == user.id) profile = pro;
    });
    return profile;
  };
  return (
    <Swiper
      modules={[Navigation, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {users.map((user) => {
        const profile = getProfileByUser(user);
        return (
          <>
            {user.role_id == 1 && (
              <SwiperSlide>
                <Parallax filter image={`${bannerUrl}/${profile.banner}`}>
                  <Grid container sx={{ zIndex: "1", m: "25px" }}>
                    <Grid item sm={12} md={9}>
                      <Typography variant="h4">
                        {profile ? (
                          <>
                            {profile.lastname} {profile.firstname}
                          </>
                        ) : (
                          user.username
                        )}
                      </Typography>
                      <Typography variant="body2">
                        {profile && profile.biography}
                      </Typography>
                      <Link
                        href={`/profile/${user.username.split(" ").join("_")}`}
                      >
                        <Card sx={{ m: 2, bgcolor: "transparent" }}>
                          <CardHeader
                            avatar={
                              <Avatar
                                sx={{ bgcolor: "red" }}
                                src={
                                  profile.avatar ? (
                                    `${avatarUrl}/${profile.avatar}`
                                  ) : (
                                    <AccountCircle />
                                  )
                                }
                              />
                            }
                            title={
                              <Typography variant="h6">
                                {profile.lastname} {profile.firstname}
                              </Typography>
                            }
                            subheader={
                              <Typography variant="body1" color="text.thirdy">
                                {user.email}
                              </Typography>
                            }
                            sx={{ p: "10px", color: "#fff" }}
                          />
                        </Card>     
                      </Link>
                    </Grid>
                  </Grid>
                </Parallax>
              </SwiperSlide>
            )}
          </>
        );
      })}
    </Swiper>
  );
};

export default HomeParallax;
