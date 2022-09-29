import React from 'react'
import {Card, CardContent, CardActionArea, CardMedia, Typography} from '@mui/material'

const CardPost = ({title, content, imageUrl}) => {
    console.log(imageUrl)
  return (
    <Card>
        <CardActionArea>
            <CardMedia component="img" height="140" image={imageUrl} alt={title}/>
            <CardContent>
                <Typography gutterBottom variant='h5' component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default CardPost