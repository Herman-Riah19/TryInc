import React, { useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Avatar } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Link } from '@inertiajs/inertia-react'
import { Logout, Person, Settings } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchInput from './SearchInput'

const Navbar = ({ auth, authAvatar }) => {
  const isLoggedIn = auth.guards.web.isLoggedIn
  const pages = [
    {
      title: 'Collections',
      link: '/collection',
    },
    {
      title: 'NFT',
      link: '/',
    },
    {
      title: 'Artists',
      link: '/',
    },
    {
      title: 'Create',
      link: isLoggedIn ? '/product/create/' : '/login'
    }
  ]
  

  const [anchorE, setAnchorE] = useState(null)

  const handleMenu = (event) => {
    setAnchorE(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorE(null);
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='default' >
        <Toolbar sx={{ p: '0' }}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link href='/' style={{ textDecoration: 'none', color: '#000'}}>
              Trink
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={page.link} style={{ textDecoration: 'none', color: '#000'}}>
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                variant='text'
                sx={{ m: 2, display: 'block', color:'#000' }}
              >
                <Link href={page.link} style={{ textDecoration: 'none',}}>
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>
          <Box >
            <SearchInput />
          </Box>
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
                  {authAvatar ? (
                    <Avatar sx={{ bgcolor: 'red', width: '30px', height: '30px' }} src={authAvatar} />
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
                  onClose={handleClose}
                  sx={{ mt: '50px', p: '10px' }}>
                  <Link href={`/profile/${auth.guards.web.user.username.replace(' ', '_')}`} style={{ color: '#000e', textDecoration: 'none' }}>
                    <MenuItem> <Person sx={{ mr: '10px', width: '20px' }} /> Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}> <Settings sx={{ mr: '10px', width: '20px' }} /> Setting</MenuItem>
                  <Link href='/logout' style={{ textDecoration: 'none' }}>
                    <MenuItem> <Logout sx={{ mr: '10px', width: '20px' }} /> Logout</MenuItem>
                  </Link>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Link href='/login' style={{ textDecoration: 'none' }}>
                  <Button sx={{ marginLeft:'5px', color:'#fff' }} variant='contained' color='secondary'>Login</Button>
                </Link>
                <Link href='/register' style={{ textDecoration: 'none' }}>
                  <Button sx={{ marginLeft:'5px' }} variant='contained' color='warning'>Register</Button>
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