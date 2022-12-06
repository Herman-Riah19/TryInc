import React, { useState } from 'react'
import { Box, Grid, Container, TextField, Button, AppBar, Toolbar, IconButton, Typography, Divider } from '@mui/material'
import { Link, useForm } from '@inertiajs/inertia-react'
import { ArrowBack, PhotoCamera } from '@mui/icons-material'
import Footer from '../../Components/Footer/Footer'

const EditUser = ({ user, profile, auth, profileAvatarUrl, profileBannerUrl }) => {
    const [userAvatar, setUserAvatar] = useState(``)
    const [userBanner, setUserBanner] = useState(``)

    const { data, setData, errors } = useForm({
        avatar: '',
        banner: '',
        lastname: profile.lastname,
        firstname: profile.firstname,
        biography: profile.biography,
        location: profile.location,
        company: profile.company,
        facebookUrl: profile.facebook_url,
        instagramUrl: profile.instagram_url,
        twitterUrl: profile.twitter_url,
        youtubeUrl: profile.youtube_url,
    })

    const readFileUser = async (event) => {
        const fileReader = new FileReader()
        if (event.target.id === 'avatar') {
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    setUserAvatar(fileReader.result)
                }
            }
            await fileReader.readAsDataURL(event.target.files[0])
        } else if (event.target.id === 'banner') {
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    setUserBanner(fileReader.result)
                }
            }
            await fileReader.readAsDataURL(event.target.files[0])
        }
    }

    const handleChange = (event) => {
        const key = event.target.id
        const value = event.target.value
        setData(values => ({
            ...values,
            [key]: value
        }))
        readFileUser(event)
    }

    return (
        <Box>
            <AppBar color='background'>
                <Toolbar>
                    <Link href={`/profile/${user.username.replace(' ', '_')}`}>
                        <IconButton variant='contained'>
                            <ArrowBack />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 10, height:'100%' }}>
                <form method='post' action={`/profile/edit/${auth.guards.web.user.id}`} encType="multipart/form-data">
                    <Typography variant='h4' sx={{ textAlign: 'center', m: 5 }}>Edit the user account</Typography>
                    <Grid container spacing={4} sx={{ mb: 3, ml: 5, mr: 5, mt: '5px' }}>
                        <Grid item md={4}>
                            <Typography variant='h5'>Presentation</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Grid container spacing={2}>
                                <Grid sx={7} md={6}>
                                    <Typography variant='body2'>Avatar</Typography>
                                    <Button
                                        sx={{
                                            width: '250px',
                                            height: '200px',
                                            backgroundImage: `url(${userAvatar})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            border: 'dashed 2px #05043D'
                                        }}
                                        component='label'>
                                        <input
                                            margin="normal"
                                            type="file"
                                            id='avatar'
                                            name='avatar'
                                            value={data.avatar}
                                            onChange={handleChange}
                                            style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                                        {!userAvatar && <PhotoCamera />}
                                        <span>{errors.avatar}</span>
                                    </Button>
                                </Grid>
                                <Grid sx={4} md={3}>
                                    <Typography variant='body2'>Banner</Typography>
                                    <Button
                                        sx={{
                                            width: '300px',
                                            height: '200px',
                                            backgroundImage: `url(${userBanner})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            border: 'dashed 2px #05043D'
                                        }}
                                        component='label'>
                                        <input
                                            margin="normal"
                                            type="file"
                                            id='banner'
                                            name='banner'
                                            value={data.banner}
                                            onChange={handleChange}
                                            style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                                        {!userBanner && <PhotoCamera />}
                                        <span>{errors.banner}</span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={4} sx={{ mb: 3, ml: 5, mr: 5, mt: '5px' }}>
                        <Grid item md={4}>
                            <Typography variant='h5'>Identity</Typography>
                        </Grid>

                        <Grid item md={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                autoComplete="lastname"
                                value={data.lastname}
                                helperText={errors.lastname}
                                autoFocus
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                autoComplete="firstname"
                                value={data.firstname}
                                helperText={errors.firstname}
                                autoFocus
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={4} sx={{ mb: 3, ml: 5, mr: 5, mt: '5px' }}>
                        <Grid item md={4}>
                            <Typography variant='h6'>Location</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="company"
                                label="Company"
                                name="company"
                                autoComplete="company"
                                value={data.company}
                                helperText={errors.company}
                                autoFocus
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="biography"
                                label="Biography"
                                name="biography"
                                autoComplete="biography"
                                value={data.biography}
                                helperText={errors.biography}
                                autoFocus
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="location"
                                label="Location"
                                name="location"
                                autoComplete="location"
                                value={data.location}
                                helperText={errors.location}
                                autoFocus
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container spacing={4} sx={{ mb: 3, ml: 5, mr: 5, mt: '5px' }}>
                        <Grid item md={4}>
                            <Typography variant='h6'>Social Media</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="facebookUrl"
                                label="Facebook url account"
                                name="facebookUrl"
                                autoComplete="facebookUrl"
                                value={data.facebookUrl}
                                helperText={errors.facebookUrl}
                                autoFocus
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="instagramUrl"
                                label="Instagram Url account"
                                name="instagramUrl"
                                autoComplete="instagramUrl"
                                value={data.instagramUrl}
                                helperText={errors.instagramUrl}
                                autoFocus
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="twitterUrl"
                                label="Twitter Url account"
                                name="twitterUrl"
                                autoComplete="twitterUrl"
                                value={data.twitterUrl}
                                helperText={errors.twitterUrl}
                                autoFocus
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="youtubeUrl"
                                label="Youtube Url account"
                                name="youtubeUrl"
                                autoComplete="youtubeUrl"
                                value={data.youtubeUrl}
                                helperText={errors.youtubeUrl}
                                autoFocus
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='secondary' sx={{ mt: 3, mb: 2 }}>Register</Button>
                </form>
            </Container>
            <Footer />
        </Box>
    )
}

export default EditUser