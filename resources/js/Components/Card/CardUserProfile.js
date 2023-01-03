import React from 'react'
import { Avatar, Card, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material'
import { Link } from "@inertiajs/inertia-react"
const style = {
    banner: {
        height: '200px',
        backgroundColor: '#000'
    },
    avatar: {
        position: 'relative',
        top: '-50px',
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42)",
        width: '100px',
        height: '100px'
    },
    username: {
        textTransform: 'capitalize'
    }
}
const CardUserProfile = (props) => {
    const { user, avatarUrl, profile, bannerUrl } = props
    
    return (
        <Card>
            <CardActionArea>
                <Link href={`/profile/${user.username}`}>
                    <CardMedia
                        component="img"
                        image={`${bannerUrl}/${profile.banner}`}
                        alt={user.username}
                        sx={style.banner} />
                </Link>
                <CardActions>
                    <Avatar
                        alt={user.username}
                        sx={style.avatar}
                        src={`${avatarUrl}/${profile.avatar}`} />
                    <Typography variant='h5' sx={style.username}>
                        {user.username}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default CardUserProfile