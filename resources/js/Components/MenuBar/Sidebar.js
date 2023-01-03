import { Button, ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar } from '@mui/material'
import { Category, Collections, Home, ManageAccounts, Menu } from '@mui/icons-material'
import React from 'react'
import { Link } from '@inertiajs/inertia-react'

const Sidebar = () => {

    const itemActiveStyle = {
        margin: 1,
        padding: 2,
    }

    return (
        <MenuList>
            <Toolbar>
                <ListItemIcon>
                    <Menu />
                </ListItemIcon>
                <ListItemText>Menu app</ListItemText>
            </Toolbar>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon >
                    <Home />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord'}>
                        Dashboard
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon >
                    <Collections />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord/collections'}>
                        Collections
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon >
                    <Category />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord/categorie/create'} >
                        Categories
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon >
                    <ManageAccounts />
                </ListItemIcon>
                <ListItemText>
                    <Link href='/'>
                        Manage Account
                    </Link>
                </ListItemText>
            </MenuItem>
        </MenuList>
    )
}

export default Sidebar