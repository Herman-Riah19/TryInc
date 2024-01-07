import React from 'react'
import {Card, CardContent, CardActionArea, CardMedia, Typography} from '@mui/material'
import { Link } from '@inertiajs/inertia-react'

const CardPost = ({key, title, slug, content, imageUrl, classes}) => {
    
  return (
    <Card key={key} sx={classes}>
        <CardActionArea>
            <Link href={`/post/${slug}`}>
                <CardMedia component="img" sx={{minHeight: '120px',overflow: 'hidden'}} image={imageUrl} alt={title}/>
                <CardContent sx={{height: '220px'}}>
                    <Typography gutterBottom variant='h5' component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color='text.secondary' dangerouslySetInnerHTML={{ __html: content}} />
                </CardContent>
            </Link>
        </CardActionArea>
    </Card>
  )
}

export default CardPost