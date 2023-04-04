import { Link } from '@inertiajs/inertia-react'
import { Avatar, Card, CardHeader, Typography } from '@mui/material'
import React from 'react'

const CardUser = ({ user, avatar, profile }) => {
  const username = user.username.split(' ').join('_')
  return (
    <Card 
      sx={{ 
        m: '12px', 
        color: '#000', 
        background: '#181A2D',
        '&:hover': {
          background: '#212439'
        } }}>
      <Link href={`/profile/${username}`} style={{color: '#000', textDecoration: 'none'}}>
        <CardHeader
          sx={{p: '5px', m:'5px'}}
          avatar={
            <Avatar 
              sx={{ bgcolor: 'red' }} 
              alt={user.username} 
              src={avatar} />
          }
          title={<Typography variant='h6' color='primary'>{profile.firstname} {profile.lastname}</Typography>}
          subheader={<Typography variant='small' color='text.thirdy'>{profile.company}</Typography>} />
      </Link>
    </Card>
  )
}

export default CardUser