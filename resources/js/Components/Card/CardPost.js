import React from 'react'
import {Card, CardContent, CardActionArea, CardMedia, Typography} from '@mui/material'
import { Link } from '@inertiajs/inertia-react'

const CardPost = ({title, slug, content, imageUrl}) => {
    
  return (
    <Card>
        <CardActionArea>
            <Link href={`/post/${slug}`}>
                <CardMedia component="img" height="140" image={imageUrl} alt={title}/>
                <CardContent>
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