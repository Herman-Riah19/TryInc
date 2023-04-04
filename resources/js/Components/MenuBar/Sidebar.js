import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import { Category, Collections, Home, ManageAccounts, PostAdd } from '@mui/icons-material'
import React from 'react'
import { Link } from '@inertiajs/inertia-react'

const Sidebar = ({ isOpen }) => {

    const itemActiveStyle = {
        margin: 1,
        padding: 2,
        color: 'white'
    }

    return (
        <MenuList sx={theme => ({
            position: 'fixed',
            background:'#35414c',
            zIndex: 1,
            height: '50rem',
            transition: 'width 2s',
            display: isOpen ? 'block':'none', 
            [theme.breakpoints.down('md')]: {
                display: isOpen ? 'none':'block'
            },
            [theme.breakpoints.up('sm')]: {
                display: isOpen ? 'block':'none'
            }
        })}>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon sx={{color:'white'}}>
                    <Home />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord'}>
                        Dashboard
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon sx={{color:'white'}}>
                    <PostAdd />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord/post/create'}>
                        Post
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon sx={{color:'white'}}>
                    <Collections />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord/collections'}>
                        Collections
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon sx={{color:'white'}}>
                    <Category />
                </ListItemIcon>
                <ListItemText>
                    <Link href={'/dashbord/categorie/create'} >
                        Categories
                    </Link>
                </ListItemText>
            </MenuItem>
            <MenuItem sx={itemActiveStyle}>
                <ListItemIcon sx={{color:'white'}}>
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