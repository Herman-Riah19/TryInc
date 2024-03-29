import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Navbar from '../../Components/MenuBar/Navbar'
import CardUserProfile from '../../Components/Card/CardUserProfile'
import Footer from '../../Components/Footer/Footer'

const style = {
  section: {
    position: 'relative',
    width: 'auto',
    margin: '50px'
  },
}
const ArtistList = ({ auth, avatarUrl, authenticateProfile, artists, profiles, bannerUrl }) => {

  return (
    <Box>
      <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
      <Box sx={{ mt: '100px' }}>
        <Box sx={style.section}>
          <Typography variant='h4'>All Artists</Typography>
          <Grid container spacing={2}>
            {artists.map(artist => {
              let profile = new Object()
              profiles.map(pro => {
                if (pro.user_id == artist.id)
                  profile = pro
              })
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  {artist.role_id != 2 &&
                    <CardUserProfile
                      user={artist}
                      profile={profile}
                      avatarUrl={avatarUrl}
                      bannerUrl={bannerUrl} />
                  }
                </Grid>
              )
            }
            )}
          </Grid>
        </Box>

      </Box>
      <Footer auth={auth} />
    </Box>
  )
}

export default ArtistList