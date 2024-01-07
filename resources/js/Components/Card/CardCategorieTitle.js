import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardHeader, Avatar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from '@inertiajs/inertia-react'
import { Delete } from '@mui/icons-material'

const useStyle = makeStyles(() => ({
    cardBody: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        inset: '0px',
        borderRadius: "50px"
    },
    cardFooter: {
        padding: '0px',
        m: '0',
        alignItems: 'center',
    },
}))
const CardCategorieTitle = ({ categorie, url, auth }) => {
    const classes = useStyle()
    const categorieName = categorie.name.split(' ').join('_')

    const isLoggedIn = auth.guards.web.isLoggedIn
    let admin = ''
    if (isLoggedIn) {
        admin = auth.guards.web.user.id
    }

    return (
        <Card className={classes.cardBody}>
            <Link href={`/categorie/${categorieName}`}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red" }} src={`${url}/${categorie.asset}`} />
                }
                title={categorie.name}
                subheader={
                    <Typography variant="body" color="text.thirdy">
                        {categorie.slug}
                    </Typography>
                } />
            </Link>
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