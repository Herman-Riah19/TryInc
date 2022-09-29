import React, { useState } from 'react'
import { Link, useForm } from '@inertiajs/inertia-react'
import { Box, Grid, Typography, Avatar, TextField, FormControlLabel, FormControl, InputLabel, OutlinedInput, Checkbox, Button, Paper, InputAdornment, IconButton, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { data, setData, errors } = useForm({
    uid: '',
    password: '',
    rememberMe: false
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
          backgroundImage: 'url(/img/login_banner.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <Container sx={{ m: 10 }}>
          <Typography component='h2' sx={{ color: 'white', fontSize: '50px' }}>
            Welcome to Hidroid!
          </Typography>
          <Typography component='h4' sx={{ color: 'white', fontSize: '50px' }}>
            Let's Login
          </Typography>

        </Container>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            Sign in
          </Typography>
          <Box component="form" method='post' sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="uid"
              label="Your Email Address"
              name="uid"
              autoComplete="uid"
              value={data.uid}
              helperText={errors.uid}
              autoFocus
              onChange={handleChange}
            />
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                helperText={errors.password}
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
                label="Password"
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.rememberMe}
                  onChange={handleChange}
                  color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login