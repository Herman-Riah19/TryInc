import React from 'react'
import { Avatar, Card, CardActions, CardHeader, IconButton, Typography, Container, CardContent } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const Comment = () => {
    return (
        <Card sx={{margin: '10px'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" >
                        H
                    </Avatar>
                }
                action={
                    <IconButton aria-label='setting'>
                        <MoreVert />
                    </IconButton>
                }
                title='herman christian'
                sx={{ padding: '10px'}}
            />
            <CardContent sx={{marginLeft: '50px', marginRight: '20px',padding: '5px'}}>
                <Typography variant="body2">
                    Hello world! this is my first comment type
                    building project...
                    [ info ]  starting http server...
                    [1661427606953] INFO (Application/10596 on gaming): started server on 0.0.0.0:3333
                    [ encore ] Running webpack-dev-server ...
                    [ info ]  watching file system for changes
                    ╭─────────────────────────────────────────────────────
                </Typography>
            </CardContent>
            <CardActions sx={{marginLeft: '20px', padding: '0px'}}>
                <Container>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share to your friend">
                        <ShareIcon />
                    </IconButton>
                </Container>
            </CardActions>
        </Card>
    )
}

export default Comment