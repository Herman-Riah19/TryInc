import { Link } from '@inertiajs/inertia-react'
import { Avatar, Card, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'

const CardUser = ({ user, avatar }) => {
  const username = user.username.replace(' ', '_')
  return (
    <Card sx={{ m: '12px', background: 'linear-gradient(to right, #052644, #102048)', color: 'white', borderRadius: '20px' }}>
      <Link href={`/profile/${username}`} style={{color: 'white', textDecoration: 'none'}}>
        <CardHeader
          sx={{p: '5px', m:'5px'}}
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} alt={user.username} src={avatar} />
          }
          title={user.username}
          subheader={<Typography variant='small'>{user.email}</Typography>} />
      </Link>
    </Card>
  )
}

export default CardUser