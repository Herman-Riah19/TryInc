import React, { useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Avatar } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link } from '@inertiajs/inertia-react'

const Navbar = ({ auth, avatar }) => {
  const isLoggedIn = auth.guards.web.isLoggedIn

  const [anchorE, setAnchorE] = useState(null)

  const handleMenu = (event) => {
    setAnchorE(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link href='/' style={{ textDecoration: 'none', color: '#fff' }}>
              Hidroid
            </Link>
          </Typography>
          <Box>
            {isLoggedIn ? (
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit">
                    {avatar ? (
                      <Avatar sx={{ bgcolor: 'red', width:'40px', height:'40px' }} src={avatar} />
                    ) : (
                      <AccountCircle />
                    )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorE}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorE)}
                  onClose={handleClose}>
                  <Link href={`/profile/${auth.guards.web.user.username.replace(' ','_')}`}style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem >Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <Link href='/logout' style={{ color: 'black', textDecoration: 'none' }}>
                    <MenuItem >Logout</MenuItem>
                  </Link>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Link href='/login' style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: '#fff' }}>Login</Button>
                </Link>
                <Link href='/register' style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: '#fff' }}>Register</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar