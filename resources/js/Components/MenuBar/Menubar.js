import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import SearchInput from './SearchInput'
import { Menu, Notifications, Settings } from '@mui/icons-material'

const Menubar = () => {
  return (
    <AppBar sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar sx={{ p: '0' }}>
        <Typography variant='h6'>Trinkx</Typography>
        <Box sx={{ flexGrow: 1 }}>
        </Box>
        <Box >
          <SearchInput />
        </Box>
        <Box>
          <IconButton>
            <Notifications />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <IconButton>
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menubar