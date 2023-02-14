import React from 'react'
import { Collapse, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Link } from '@inertiajs/inertia-react'

const CollapseMenu = ({ title, icon, datas, route}) => {
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {datas.map(data => {
                    const dataName = data.name.replace(' ', '_')
                    return (
                        <>
                            <Link href={`${route}/${dataName}`}>
                                <ListItemButton sx={{ pl: 8 }}>
                                    <ListItemText>
                                        {data.name}
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default CollapseMenu