import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from '@inertiajs/inertia-react'
import { Delete } from '@mui/icons-material'

const useStyle = makeStyles(() => ({
    cardBody: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        inset: '0px',
    },
    cardMedia: {
        objectFit: 'fill',
        height: '100px',
        width: '100%'
    },
    cardFooter: {
        padding: '0px',
        m: '0',
        alignItems: 'center',
    },
    cardTitle: {
        position: 'relative',
        top: '5px',
        color: '#fff',
        fontSize: '22px',
        textAlign: 'center',
    },
}))
const CardCategorieTitle = ({ categorie, auth }) => {
    const classes = useStyle()
    const categorieName = categorie.name.split(' ').join('_')

    const isLoggedIn = auth.guards.web.isLoggedIn
    let admin = ''
    if (isLoggedIn) {
        admin = auth.guards.web.user.id
    }

    return (
        <Card >
            <CardActionArea>
                <Link href={`/categorie/${categorieName}`}>
                    <Typography variant="h3" class={classes.cardTitle}>{categorie.name}</Typography>
                </Link>
            </CardActionArea>
            <CardActions class={classes.cardFooter}>
                {admin == 1 && (
                    <Link href={`/categorie/delete/${categorie.id}`} class={classes.deleteBtn}>
                        <Button variant='contained' fullWidth color='warning' endIcon={<Delete />} >Delete</Button>
                    </Link>
                )}
            </CardActions>
        </Card>
    )
}

export default CardCategorieTitle