import { AppBar, Box, IconButton, Toolbar, Typography, ListItemText, ListItemIcon } from '@mui/material'
import React from 'react'
import SearchInput from './SearchInput'
import { Home, Menu, Notifications, Settings } from '@mui/icons-material'
import { Link } from '@inertiajs/inertia-react'

const Menubar = ({ onClick }) => {
  return (
    <AppBar sx={{ boxShadow: 'none', background: '#35414c', color: '#fff' }}>
      <Toolbar sx={{ p: '0' }}>
        <ListItemIcon sx={{ color: 'white', size: '25px' }} onClick={onClick}>
          <Menu />
        </ListItemIcon>
        <ListItemText>
          <Typography variant='h1'>Trinkx</Typography>
        </ListItemText>
        <Box sx={{ flexGrow: 1 }}>
        </Box>
        <Box >
          <SearchInput />
        </Box>
        <Box>
          <IconButton sx={{ color: 'white' }}>
            <Notifications />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Settings />
          </IconButton>
          <Link href={'/'}>
            <IconButton sx={{ color: 'white' }}>
              <Home />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menubar