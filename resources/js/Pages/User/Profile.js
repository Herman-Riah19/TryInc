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

const Profile = ({ user, profile, auth, authenticateProfile, products, productUrl, avatarUrl, profileBannerUrl }) => {
  const classes = useStyle()

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
      <Box sx={{ mt: 5 }}>
        <Container sx={{ mb: 1 }}>
          <div className={classes.banner} style={{ backgroundImage: `url(${profileBannerUrl}/${profile.banner})` }} >
            <div className={classes.avatar}>
              <Avatar
                alt={user.username}
                sx={{
                  boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42)",
                  width: '100px',
                  height: '100px'
                }}
                src={`${avatarUrl}/${profile.avatar}`} />
            </div>
          </div>
          <Grid container>
            <Grid item xs={7} sm={8} md={9}>
              <Typography variant='h6'>
                {profile ? (
                  <>
                    {profile.lastname} {profile.firstname}
                  </>
                ) : user.username}
              </Typography>
              <Typography variant='paragraph' color='text.thirdy'> {profile.biography} </Typography>
              <Typography variant='body2' color='text.thirdy'> {profile.company} </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <ButtonGroup variant='outlined' sx={{justifyContent: 'space-between'}}>
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
                <Button
                  id='more-button'
                  aria-controls={MoreButtonOpen ? 'basic-menu' : undefined}
                  color='secondary'
                  variant='outlined'
                  aria-expanded={MoreButtonOpen ? 'true' : undefined}
                  onClick={handleMoreButtonClick}
                  endIcon={<Share /> }>
                  Follow me 
                </Button>
                <Menu
                  id="more-menu"
                  anchorEl={moreMenu}
                  open={MoreButtonOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <a href={`${profile.facebook_url}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <MenuItem>
                      <Facebook sx={{ mr: '10px', width: '20px' }} /> Facebook
                    </MenuItem>
                  </a>
                  <a href={`${profile.twitter_url}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <MenuItem>
                      <Twitter sx={{ mr: '10px', width: '20px' }} /> Twitter
                    </MenuItem>
                  </a>
                  <a href={`${profile.instagram_url}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <MenuItem>
                      <Instagram sx={{ mr: '10px', width: '20px' }} /> Instagram
                    </MenuItem>
                  </a>
                </Menu>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ margin: '10px' }}>
          <TabImage
            products={products}
            username={user.username}
            profile={profile}
            avatar={avatarUrl}
            banner={profileBannerUrl}
            productUrl={productUrl}
            auth={auth} />
        </Container>
      </Box>
      <Footer auth={auth} />
    </Box>
  )
}

export default Profile
