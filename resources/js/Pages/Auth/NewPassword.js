import React, { useState } from 'react'
import { Avatar, Box, Container, IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, Typography, Button, FormHelperText } from '@mui/material'
import { LockClockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from '@inertiajs/inertia-react'

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

const NewPassword = ({ user }) => {
    const { data, setData, errors } = useForm({
        email: user.email,
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = (event) => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

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
                    <Typography variant='h5'>{data.email}</Typography>
                    <FormControl error={errors?.password} sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <FormHelperText sx={{ color: 'red' }}>
                            {errors?.password && errors?.password.message}
                        </FormHelperText>
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }} >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default NewPassword