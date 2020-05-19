import React from 'react';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

const ListWrapper = styled(List)({
  '& li': {
    border: '#0000000a solid 1px',
    borderRadius: '5px',
    marginBottom: '5px',
    '&:hover': {
      border: '#0000001a solid 1px',
      '& .brother-controls': {
        display: 'inline'
      }
    }
  }
});

const ControlsWrapper = styled(ListItemSecondaryAction)({
  display: 'none'
});

export default function BrothersList(props) {
  const { brothers } = props;

  return (
    <ListWrapper>
      {brothers.map((brother, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={brother.nick_name} />
          <ControlsWrapper className="brother-controls">
            <IconButton edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
          </ControlsWrapper>
        </ListItem>
      ))}
    </ListWrapper>
  );
}
