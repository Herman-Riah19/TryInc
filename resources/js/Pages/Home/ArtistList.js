import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import Navbar from '../../Components/MenuBar/Navbar'
import CardUserProfile from '../../Components/Card/CardUserProfile'

const ArtistList = ({ auth, avatarUrl, authenticateProfile, artists, profiles, bannerUrl }) => {

  return (
    <Box>
      <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null}  />
      <Container sx={{mt: '70px'}}>
        <Typography variant='h6'>All Artists</Typography>
        <Grid container spacing={2}>
          {artists.map(artist => {
            let profile = new Object()
            profiles.map(pro => {
              if(pro.user_id == artist.id) 
                profile = pro
            })
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardUserProfile 
                    user={artist} 
                    profile={profile}
                    avatarUrl={avatarUrl} 
                    bannerUrl={bannerUrl}/>
              </Grid>
            )}
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default ArtistList