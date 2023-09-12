import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, TextField, Button } from '@mui/material'
import { useForm } from '@inertiajs/inertia-react'
import { router } from '@inertiajs/react'

export default function CardComment({id, comments, profileComments, assetUrl}) {
  const { data, setData, errors} = useForm({
    name: 'comment',
    body: '',
  })

  const wantPerson = (id) => {
    const person = profileComments.filter(profile => profile.userId === id);
    return person;
  }

  const handleChange = (event) => {
    const key = event.target.id
    const value = event.target.value
    setData(values => ({
      ...values,
      [key]: value
    }))
  }

  const handleComment = (event) => {
    console.log("comment button clicked: " + event.target.value)
    router.post(`/comment/add/${id}`, data)
  }
  return (
    <Box sx={{ pb: 7 }}>
        <form method='POST' style={{display:"flex"}}>
            <TextField
                margin="normal"
                fullWidth
                id="body"
                label="Comment here"
                name="body"
                autoComplete="comment"
                autoFocus
                value={data.body}
                onChange={handleChange}
              />
            <Button variant='contained' color='secondary' type="submit" onClick={handleComment}>Comment</Button>
          </form>
        <List>
        {comments && (
          <>
            {comments.map((com) => {
              const person = wantPerson(com.user_id)
              return (
              <ListItem button key={person.id}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={`${assetUrl}/${person.avatar}`} />
                </ListItemAvatar>
                <ListItemText primary={com.name} secondary={com.body} />
              </ListItem>
            )})}
          </>
        )}
      </List>
    </Box>
  );
}

