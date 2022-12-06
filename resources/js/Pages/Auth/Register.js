import React, { useState } from 'react'
import { useForm, Link } from '@inertiajs/inertia-react'
import { Box, Grid, Container, Typography, Avatar, TextField, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: 'url("/img/login_banner.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <Container sx={{m: 10}}>
          <Typography 
            component='h2' 
            sx={{color: 'white', fontSize: '50px'}}>
              Welcome to Hidroid!
          </Typography>
          <Typography 
            component='h4' 
            sx={{color: 'white', fontSize: '50px'}}>
              Let's Login
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={12} sm={8} md={5} >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" method='post' sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Username"
              name="username"
              autoComplete="username"
              value={data.username}
              errors={errors.username}
              autoFocus
              onChange={handleChange} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={data.email}
              errors={errors.email}
              autoFocus
              onChange={handleChange}/>
            <FormControl sx={{ mt: 2, mb: 2 , width: '100%'}}variant="outlined">
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                errors={errors.password}
                onChange={handleChange}
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
                placeholder="Password"
              />
            </FormControl>
            <Button type="submit" fullWidth variant='contained' color='secondary' sx={{ mt: 3, mb: 2 }}>Register</Button>
            <Grid container>
              <Grid item>
                <Link href="/login">
                  {"Already have a account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Register