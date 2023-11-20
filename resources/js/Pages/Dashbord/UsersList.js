import React from 'react'
import DashbordLayout from './DashbordLayout'
import { Container, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Inertia } from '@inertiajs/inertia'


const UsersList = (props) => {
    const { auth, usersList, allUserProfiles, userUrl } = props
    
    const tableHeaderTexts = ['id', 'Image', 'Name', 'Lasname', 'Firstname', 'Action']

    const findUserProfileById = (id) => {
        let profile = new Object()
        allUserProfiles.map((data) => {
            if(data.user_id == id){
                profile = data
            }
        })
        return profile
    }
    return (
        <Container sx={{ mt: '50px', width: 'auto'}}>
            <Container>
                <Typography variant='h4' sx={{ m: 1 }}>Liste des Produits</Typography>
                <TableContainer component='paper'>
                    <Table sx={{ maxWidth: 900 }} aria-label="user table">
                        <TableHead>
                            <TableRow>
                                {tableHeaderTexts.map(item => <TableCell>{item}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map(user => {
                                const profile = findUserProfileById(user.id)
                                return (
                                    <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell sx={{ width: '100px' }}>
                                            <img
                                                src={`${userUrl}/${profile.avatar}`}
                                                style={{ width: '75px', height: '100px' }}
                                                alt='' />
                                        </TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{profile.lastname}</TableCell>
                                        <TableCell>{profile.firstname}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => Inertia.delete(`/dashbord/users/${user.id}`)}
                                                variant='contained'
                                                fullWidth
                                                sx={{ mb: '5px', color: 'white' }}
                                                color='warning'
                                                endIcon={<Delete />}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>
    )
}

UsersList.layout = page => <DashbordLayout children={page} />
export default UsersList