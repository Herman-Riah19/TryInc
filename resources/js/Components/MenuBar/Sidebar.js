import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import { Category, Collections, Home, Leaderboard, ManageAccounts, PostAdd } from '@mui/icons-material'
import React from 'react'
import { Link } from '@inertiajs/inertia-react'

const route = [
    {
        id: 1,
        link: '/dashbord',
        title: 'Dashbord',
        icon: <Home />
    },
    {
        id: 2,
        link: '/dashbord/collections',
        title: 'Collections',
        icon: <Collections />
    },
    {
        id: 3,
        link: '/dashbord/statistic',
        title: 'Statistic',
        icon: <Leaderboard />
    },
    {
        id: 4,
        link: '/dashbord/categorie/create',
        title: 'Create Categorie',
        icon: <Category />
    },
    {
        id: 5,
        link: '/dashbord/post/create',
        title: 'Create Post',
        icon: <PostAdd />
    },
    
]
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
        {route.map(item => (
            <MenuItem key={item.id} sx={itemActiveStyle}>
                <ListItemIcon sx={{color:'white'}}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText>
                    <Link href={item.link}>
                        {item.title}
                    </Link>
                </ListItemText>
            </MenuItem>
        ))}
        </MenuList>
    )
}

export default Sidebar