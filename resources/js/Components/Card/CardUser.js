import { Link } from '@inertiajs/inertia-react'
import { Avatar, Card, CardHeader, Typography } from '@mui/material'
import React from 'react'

const CardUser = ({ user, avatar }) => {
  const username = user.username.split(' ').join('_')
  return (
    <Card 
      sx={{ 
        m: '12px', 
        color: '#000', 
        borderRadius: '20px' }}>
      <Link href={`/profile/${username}`} style={{color: '#000', textDecoration: 'none'}}>
        <CardHeader
          sx={{p: '5px', m:'5px'}}
          avatar={
            <Avatar 
              sx={{ bgcolor: 'red' }} 
              alt={user.username} 
              src={avatar} />
          }
          title={user.username}
          subheader={<Typography variant='small' color='text.thirdy'>{user.email}</Typography>} />
      </Link>
    </Card>
  )
}

export default CardUser