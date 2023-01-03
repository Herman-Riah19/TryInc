import React from 'react'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from '@inertiajs/inertia-react'

const useStyle = makeStyles(() => ({
    cardBody: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        inset: '0px',
    },
    cardMedia: {
        objectFit: 'cover',
        height: '100px',
        width: '100%'
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
const CardCategorie = ({ categorie, categorieUrl }) => {
    const classes = useStyle()
    const categorieName = categorie.name.replace(' ','_')
    return (
        <Card>
            <CardActionArea>
                <Link href={`/categorie/${categorieName}`}>
                    <CardContent class={classes.cardBody}>
                        <CardMedia
                            component='img'
                            class={classes.cardMedia}
                            image={`${categorieUrl}/${categorie.asset}`}
                            alt={categorie.slug} />
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions class={classes.cardFooter}>
                <Typography variant="h3" class={classes.cardTitle}>{categorie.name}</Typography>
            </CardActions>
        </Card>
    )
}

export default CardCategorie