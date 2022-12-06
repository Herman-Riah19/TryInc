import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles(() => ({
    cardBody: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        inset: '0px',
        height: '250px',
    },
    cardMedia: {
        objectFit: 'cover',
        height: '0',
        minHeight: '100%',
        maxHeight: '100%',
        width: '0',
        minWidth: '100%',
        maxWidth: '100%',
    },
    cardFooter: {
        height: '50px',
        padding: '0px',
        alignItems: 'center'
    },
    cardTitle: {
        fontSize: '22px',
        marginTop: '15px',
        textAlign: 'center',
    },
}))
const CardCategorie = ({ name, slug, asset }) => {
    const classes = useStyle()
    return (
        <Card>
            <CardActionArea>
                <CardContent class={classes.cardBody}>
                    <CardMedia
                        component='img'
                        class={classes.cardMedia}
                        image={asset}
                        alt={slug} />
                </CardContent>
            </CardActionArea>
            <CardActions class={classes.cardFooter}>
                <Typography variant="h3" class={classes.cardTitle}>{name}</Typography>
            </CardActions>
        </Card>
    )
}

export default CardCategorie