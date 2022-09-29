import React, { useState } from 'react'
import { Avatar, Box, Container, Grid, Menu, MenuItem, Typography, ButtonGroup, IconButton, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Navbar from '../../Components/MenuBar/Navbar'
import TabImage from '../../Components/TabImage'
import profileStyle from '../../Style/ProfileStyle'
import { MoreVert, PersonAdd, Share } from '@mui/icons-material'
import { Link } from '@inertiajs/inertia-react'

const useStyle = makeStyles(profileStyle)

const Profile = ({ user, profile, auth, products, productUrl, profileAvatarUrl,profileBannerUrl }) => {
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
      <Navbar auth={auth} avatar={`${profileAvatarUrl}/${profile.avatar}`}/>
      <Box sx={{ mt: 5 }}>
        <Container sx={{ mb: 10 }}>
          <div className={classes.banner} style={{backgroundImage: `url(${profileBannerUrl}/${profile.banner})`}} >
            <div className={classes.avatar}>
              <Avatar 
                alt={user.username} 
                sx={{ 
                  boxShadow:"0 10px 30px -12px rgba(0, 0, 0, 0.42)", 
                  width: '100px', 
                  height: '100px' }} 
                src={`${profileAvatarUrl}/${profile.avatar}`} />
            </div>
          </div>
          <Grid container>
            <Grid item xs={7} sm={8} md={9}>
              <Typography variant='h6'>{user.username}</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <ButtonGroup variant='outlined'>
                <Button variant='contained' endIcon={<PersonAdd />}>Follow</Button>
                <IconButton>
                  <Share />
                </IconButton>
                {auth.guards.web.isLoggedIn && (
                  <>
                    <IconButton
                      id='more-button'
                      aria-controls={MoreButtonOpen ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={MoreButtonOpen ? 'true' : undefined}
                      onClick={handleMoreButtonClick}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      id="more-menu"
                      anchorEl={moreMenu}
                      open={MoreButtonOpen}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}>
                      <MenuItem>
                        <Link href={`/profile/edit/${user.id}`} style={{textDecoration: 'none', color: 'black'}}>
                          <Typography variant='p' sx={{ textDecoration: 'none' }}>Edit</Typography>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </ButtonGroup>
            </Grid>
          </Grid>
        </Container>

        <Container>
          <TabImage
            products={products}
            username={user.username}
            productUrl={productUrl} />
        </Container>
      </Box>
    </Box>
  )
}

export default Profile