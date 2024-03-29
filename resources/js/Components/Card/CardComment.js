import React from 'react';
import { Box, List, Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material'
import { Link } from "@inertiajs/inertia-react";

export default function CardComment({id, comments, users, profileComments, assetUrl}) {

  const wantPerson = (id) => {
    let person = {}
    profileComments.map(profile => {
      if(profile.user_id === id) {
        person = profile
      }
    });
    return person;
  }
    
  const getUserCommentor = (id) => {
    let name = ''
    users.map(user => {
      if(user.id === id) {
        name = user.username
      }
    })
    return name
  }

  return (
    <Box sx={{ pb: 7 }}>
        <List>
        {comments && (
          <>
            {comments.map((com) => {
              const person = wantPerson(com.user_id)
              const username = getUserCommentor(com.user_id)
              return (
                <Card key={com.id} sx={{ marginBottom: 2 }}>
                  <Link
                    href={`/profile/${username}`}
                    style={{ fontWeight: 900, textDecoration: "none", color: "#fff" }}
                  >
                    <CardHeader
                      avatar={<Avatar src={`${assetUrl}/${person.avatar}`} alt={person.lastname} />}
                      title={`${person.lastname} ${person.firstname}`}
                      subheader={com.created_at}
                    />
                  </Link>
                  <CardContent sx={{ml:'50px'}}>
                    <Typography variant='body2' color="text.thirdy">{com.body}</Typography>
                  </CardContent>
                </Card>
            )})}
          </>
        )}
      </List>
    </Box>
  );
}

