import { Box, Tabs, Toolbar, IconButton, Button, Menu, MenuItem, Avatar  } from '@mui/material'
import React, { useState } from 'react'
import { Logout, Person, Settings } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'

const SectionBar = ({ isLoggedIn, authAvatar }) => {
    const [value, setValue] = useState(0)

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

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>

            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example">
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
                                <Link href={page.link} style={{ textDecoration: 'none', color: '#000' }}>
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
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link href={page.link} style={{ textDecoration: 'none', color: '#fff' }}>
                                {page.title}
                            </Link>
                        </Button>
                    ))}
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
                                <Link href={`/profile/${auth.guards.web.user.username.replace(' ', '_')}`} style={{ color: 'white', textDecoration: 'none' }}>
                                    <MenuItem> <Person sx={{ mr: '10px', width: '20px' }} /> Profile</MenuItem>
                                </Link>
                                <MenuItem onClick={handleClose}> <Settings sx={{ mr: '10px', width: '20px' }} /> Setting</MenuItem>
                                <Link href='/logout' style={{ color: 'white', textDecoration: 'none' }}>
                                    <MenuItem> <Logout sx={{ mr: '10px', width: '20px' }} /> Logout</MenuItem>
                                </Link>
                            </Menu>
                        </Box>
                    ) : (
                        <Box>
                            <Link href='/login' style={{ textDecoration: 'none' }}>
                                <Button sx={{ color: '#fff', marginLeft: '5px' }} variant='contained' color='secondary'>Login</Button>
                            </Link>
                            <Link href='/register' style={{ textDecoration: 'none' }}>
                                <Button sx={{ color: '#fff', marginLeft: '5px' }} variant='contained' color='warning'>Register</Button>
                            </Link>
                        </Box>
                    )}
                </Box>
            </Tabs>
        </Toolbar>
    )
}

export default SectionBar