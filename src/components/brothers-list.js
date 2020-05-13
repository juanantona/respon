import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Checkbox from '@material-ui/core/Checkbox';

const apiEndpoint = 'http://localhost:3000/brothers';

export default function BrothersList() {
  const [brothers, updateBrothers] = useState([]);

  useEffect(() => {
    try {
      fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          updateBrothers(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <List>
      {brothers.map((brother, index) => (
        <ListItem key={index} button>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={brother.nick_name} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <Checkbox />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
