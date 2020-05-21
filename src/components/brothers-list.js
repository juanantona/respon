import React, { useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditBrotherForm from '../components/forms/edit-brother';
import DeleteBrotherModal from '../components/delete-brother-modal';

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
  display: 'none',
  '& button': {
    marginRight: '5px'
  }
});

export default function BrothersList(props) {
  const { brothers, updateBrothers } = props;
  const [brotherId, updateBrotherId] = useState('');
  const [showEditForm, updateShowEditForm] = useState(false);
  const [showDeleteModal, updateShowDeleteModal] = useState(false);

  function handleShowEditForm(brotherId) {
    updateBrotherId(brotherId);
    updateShowEditForm(true);
  }

  function handleHideEditForm() {
    updateBrotherId('');
    updateShowEditForm(false);
  }

  function handleShowDeleteModal(brotherId) {
    updateBrotherId(brotherId);
    updateShowDeleteModal(true);
  }

  function handleHideDeleteModal() {
    updateBrotherId('');
    updateShowDeleteModal(false);
  }

  return (
    <React.Fragment>
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
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleShowEditForm(brother._id);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleShowDeleteModal(brother._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ControlsWrapper>
          </ListItem>
        ))}
      </ListWrapper>
      {showEditForm && (
        <EditBrotherForm
          brotherId={brotherId}
          updateBrothers={updateBrothers}
          handleHideEditForm={handleHideEditForm}
        />
      )}
      {showDeleteModal && (
        <DeleteBrotherModal
          brotherId={brotherId}
          updateBrothers={updateBrothers}
          handleHideDeleteModal={handleHideDeleteModal}
        />
      )}
    </React.Fragment>
  );
}
