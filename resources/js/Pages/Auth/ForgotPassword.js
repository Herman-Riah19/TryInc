import React, { useState } from 'react'
import { Avatar, Box, Container, TextField, Typography, Button } from '@mui/material'
import { LockClockOutlined } from '@mui/icons-material'

const style = {
    form: {
        mt: 10,
        padding: 5,
        borderRadius: '5px',
        boxShadow: '5px 5px 10px #8ea5d9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1
    },
    avatar: {
        margin: 1,
        bgcolor: 'secondary.main'
    }
}

const ForgotPassword = () => {
    const [ data, setData ] = useState({
        email: '',
    })

    const handleChange = (event) => {
        const key = event.target.id
        const value = event.target.value
        setData(values => ({
            ...values,
            [key]: value
        }))
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Box sx={style.form}>
                <Avatar sx={style.avatar}> <LockClockOutlined /> </Avatar>
                <Typography component='h1' variant='h5'>Forgot Password</Typography>
                <Box component='form' method='post'>
                    <Typography variant='h6'>Please enter your Email address!</Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={data.email}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }} >
                        Next
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ForgotPassword