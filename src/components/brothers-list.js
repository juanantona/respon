import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Checkbox from '@material-ui/core/Checkbox';

const brothers = [
  { nickName: 'Pepe' },
  { nickName: 'Juan' },
  { nickName: 'María' }
];

export default function BrothersList() {
  return (
    <List>
      {brothers.map(brother => (
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={brother.nickName} />
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
