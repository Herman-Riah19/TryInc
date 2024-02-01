import React, { useState } from 'react'
import { Avatar, Box, Container, Grid, Menu, MenuItem, Typography, ButtonGroup, IconButton, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Navbar from '../../Components/MenuBar/Navbar'
import TabImage from '../../Components/TabImage'
import profileStyle from '../../Style/ProfileStyle'
import { Edit, Facebook, Instagram, Share, Twitter } from '@mui/icons-material'
import { Link } from '@inertiajs/inertia-react'
import Footer from '../../Components/Footer/Footer'

const useStyle = makeStyles(profileStyle)

const Profile = (props) => {
  const { user, profile, auth, authenticateProfile, products, productUrl, likes, avatarUrl, profileBannerUrl, collections, collectionUrl, isFollowed } = props
  const classes = useStyle()

  console.log(user)

  const [moreMenu, setMoreMenu] = useState(null);
  const MoreButtonOpen = Boolean(moreMenu);

  const handleMoreButtonClick = (event) => {
    setMoreMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMoreMenu(null);
  };
  
  return (
    <Box>
      <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
      <Box sx={{ mt: 10 }}>
        <Container sx={{ mb: 1 }}>
          <div className={classes.banner} style={{ backgroundImage: `url(${profileBannerUrl}/${profile.banner})` }} >
            <div className={classes.avatar}>
              <Avatar
                alt={user.username}
                sx={{
                  boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42)",
                  width: '150px',
                  height: '150px'
                }}
                src={`${avatarUrl}/${profile.avatar}`} />
            </div>
          </div>
          <Grid container>
            <Grid item xs={12} sm={10} md={8}>
              <Box>
                <Container sx={theme => ({
                  position: 'relative',
                  top: '-20px',
                  left: '200px',
                  [theme.breakpoints.down('sm')]: {
                    position: 'static',
                    marginTop: '10px',
                    margin: '2vw'
                  },
                })}>
                  {profile ? (
                    <>
                      <Typography variant='h3' >
                        {profile.lastname} {profile.firstname}
                      </Typography>
                      <Typography variant='h6' color="text.thirdy">
                        {profile.company}
                      </Typography>
                    </>
                  ) : user.username}
                </Container>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={4}>
              <ButtonGroup variant='outlined' sx={{justifyContent: 'space-between', width:'100%'}}>
                <Grid container sx={theme => ({ [theme.breakpoints.down('sm')]:{m:'2vw'}})}>
                  <Grid item sm={12} md={6}>
                    {auth.guards.web.isLoggedIn && auth.guards.web.user.username == user.username && (
                      <Link href={`/profile/edit/${user.id}`}>
                        <Button
                          variant='contained'
                          color='secondary'
                          sx={{ color: 'white', mr:1 }}
                          endIcon={<Edit />}>
                          Edit profile
                        </Button>
                      </Link>
                    )}
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Link href={`/profile/is-followed/${user.username.split(' ').join("_")}`}>
                      <Button
                        id='more-button'
                        color='secondary'
                        variant={isFollowed ? 'contained' : 'outlined'}
                        endIcon={<Share />}>
                        <Typography variant="p">Followers {user.number_follower}</Typography>
                      </Button>
                    </Link>
                    
                  </Grid>
                </Grid>
                
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ mb: 1 }}>
          <TabImage
            likes={likes}
            products={products}
            username={user.username}
            profile={profile}
            avatar={avatarUrl}
            banner={profileBannerUrl}
            productUrl={productUrl}
            collections={collections}
            collectionUrl={collectionUrl}
            auth={auth} />
        </Container>
      </Box>
      <Footer auth={auth} />
    </Box>
  )
}

export default Profile
