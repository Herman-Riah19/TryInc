import React, { useState } from 'react'
import { useForm, Link } from '@inertiajs/inertia-react'
import { Box, Grid, Container, Typography, Avatar, TextField, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, FormHelperText, Button } from '@mui/material'
import { LockClockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'

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
const Register = () => {
  const { data, setData, errors } = useForm({
    username: '',
    email: '',
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
          <Typography component='h1' variant='h5'>Register</Typography>
          <Box component='form' method='post'>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Enter your name"
              name="username"
              autoComplete="username"
              autoFocus
              value={data.username}
              onChange={handleChange} 
              error={errors?.username}
              helperText={errors?.username && errors?.username}
            />

            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleChange} 
              error={errors?.email}
              helperText={errors?.email && errors?.email}
            />

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
              <FormHelperText sx={{color: 'red'}}>
                {errors?.password && errors?.password}
                </FormHelperText>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }} >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login">
                  {"Already have an account. Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  )
}

export default Register