import React from 'react'
import { ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar } from '@mui/material'
import { List, Menu } from '@mui/icons-material'
import { Link } from '@inertiajs/inertia-react'

const SidebarHome = ({ categories, categorieUrl }) => {

    const style = {
        itemActiveStyle: {
            margin: 1,
            padding: 1,
        },
        image: {
            borderRadius: '50px',
            height: '50px',
            width: '50px'
        }
    }


    return (
        <MenuList sx={{ height: '50rem', width: '275px', position: 'absolute', boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.42)", }}>
            <Toolbar>
                <ListItemIcon>
                    <Menu />
                </ListItemIcon>
                <ListItemText>All Categories</ListItemText>
            </Toolbar>
            {categories.map(categorie => {
                const categorieName = categorie.name.replace(' ', '_')
                return (
                    <>
                        <Link href={`/categorie/${categorieName}`}>
                            <MenuItem>
                                <ListItemIcon sx={style.itemActiveStyle}>
                                    <img src={`${categorieUrl}/${categorie.asset}`} alt={categorie.slug} style={style.image} />
                                </ListItemIcon>
                                <ListItemText>
                                    {categorie.name}
                                </ListItemText>
                            </MenuItem>
                        </Link>
                    </>
                )
            })}
        </MenuList>
    )
}

export default SidebarHome