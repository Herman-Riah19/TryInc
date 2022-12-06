import React from 'react'
import {Box, Button, Container, Typography, TextField, MenuItem } from '@mui/material'
import { usePage, useForm} from '@inertiajs/inertia-react'
import Footer from '../../Components/Footer/Footer'

const PostCreate = () => {
    const { categories } = usePage().props
    const { data, setData, errors } = useForm({
        title: '',
        description: '',
        postImage: ''
    })

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
        <Box>
            <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h5">
                        Create a new Post
                    </Typography>
                    <form method="post" encType="multipart/form-data">
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id='title'
                            name='title'
                            placeholder='Title of post'
                            errors={errors.title}
                            value={data.title}
                            onChange={handleChange}/>
                        <TextField
                            margin="normal"
                            multiline
                            required
                            fullWidth
                            minRows={5}
                            id='description'
                            style={{ width: 500 }}
                            name='description'
                            placeholder='Description of your post'
                            errors={errors.description}
                            value={data.description}
                            onChange={handleChange}/>
                       
                        <TextField
                            margin="normal"
                            type="file"
                            required
                            hidden
                            fullWidth
                            id='postImage'
                            name='postImage'
                            errors={errors.postImage}
                            value={data.postImage}
                            onChange={handleChange}/>
                        <Button type='submit' variant="outlined" fullWidth>Publish the post</Button>
                    </form>
                </Box>

            </Container>
            <Footer />
        </Box>
    )
}

export default PostCreate