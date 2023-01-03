import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Container, Grid } from '@mui/material'
import { useForm } from '@inertiajs/inertia-react'
import { PhotoCamera } from '@mui/icons-material'
import Menubar from '../../Components/MenuBar/Menubar'
import Sidebar from '../../Components/Menubar/Sidebar'

const DialogCreateCategory = () => {
    const [imageFile, setImageFile] = useState('')

    const { data, setData, errors } = useForm({
        name: '',
        slug: '',
        asset: ''
    })

    const handleChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))

        const fileReader = new FileReader()
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setImageFile(fileReader.result)
            }
        }
        fileReader.readAsDataURL(key === 'asset' && event.target.files[0])
    }

    return (
        <Box>
            <Menubar />
            <Grid container sx={{ mt: '55px' }}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <Container sx={{ m: '10px', width: 'auto' }}>
                        <Typography variant='h4'>Create Category</Typography>
                        <form method="post" encType="multipart/form-data">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                minRows={5}
                                id='name'
                                name='name'
                                errors={errors.name}
                                placeholder='name of your post'
                                value={data.name}
                                onChange={handleChange} />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                minRows={5}
                                id='slug'
                                name='slug'
                                errors={errors.name}
                                placeholder='slug of your post'
                                value={data.slug}
                                onChange={handleChange} />
                            <Button
                                sx={{
                                    backgroundImage: `url(${imageFile})`,
                                    width: '100%',
                                    height: '200px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center', border: 'dashed 2px #05043D'
                                }}
                                component='label'>
                                <input
                                    margin="normal"
                                    type="file"
                                    id='asset'
                                    name='asset'
                                    accept='image/*'
                                    value={data.asset}
                                    onChange={handleChange}
                                    style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                                {!imageFile && <PhotoCamera />}
                                <span>{errors.asset}</span>
                            </Button>

                            <Button sx={{ mt: 5 }} type='submit' variant="contained" fullWidth>Save</Button>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DialogCreateCategory