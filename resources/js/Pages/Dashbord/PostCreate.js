import React, { useState } from 'react'
import { Container, Button, Typography, TextField } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { useForm } from '@inertiajs/inertia-react'
import DashbordLayout from './DashbordLayout'

const PostCreate = () => {
    const { data, setData, errors } = useForm({
        title: '',
        description: '',
        body: '',
        postImage: ''
    })

    const [imageFile, setImageFile] = useState('')

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
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
        fileReader.readAsDataURL(key === 'postImage' && event.target.files[0])
    }

    return (
        <Container sx={{ mt: '50px', width: 'auto' }}>
            <Typography variant="h4">
                Create a new Post
            </Typography>
            <form method="post" encType="multipart/form-data">
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
                        id='postImage'
                        name='postImage'
                        accept='image/*'
                        value={data.postImage}
                        onChange={handleChange}
                        style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                    {!imageFile && <PhotoCamera />}
                    <span>{errors.postImage}</span>
                </Button>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    minRows={5}
                    id='title'
                    name='title'
                    placeholder='Title of post'
                    errors={errors.title}
                    value={data.title}
                    onChange={handleChange} />
                <TextField
                    margin="normal"
                    multiline
                    required
                    fullWidth
                    minRows={5}
                    id='description'
                    name='description'
                    placeholder='Description of your post'
                    errors={errors.description}
                    value={data.description}
                    onChange={handleChange} />
                <TextField
                    margin="normal"
                    multiline
                    required
                    fullWidth
                    minRows={5}
                    id='body'
                    name='body'
                    placeholder='body of your post'
                    errors={errors.body}
                    value={data.body}
                    onChange={handleChange} />

                <Button sx={{ mt: 5 }} type='submit' variant="contained" color='secondary' fullWidth>Publish the post</Button>
            </form>
        </Container>
    )
}

PostCreate.layout = page => <DashbordLayout children={page} />

export default PostCreate