import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const apiEndpoint = 'http://localhost:3000/brothers';

const CloseModalButton = styled(IconButton)({
  position: 'absolute',
  top: '0',
  right: '0',
  margin: '8px'
});

export default function DeleteBrotherModal(props) {
  const { brotherId, updateBrothers, handleHideDeleteModal } = props;
  const [openModal, updateOpenModal] = useState(true);

  function handleModalClose() {
    updateOpenModal(false);
    handleHideDeleteModal();
  }

  function handleSubmit() {
    try {
      fetch(`${apiEndpoint}/${brotherId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          updateBrothers(data);
          handleHideDeleteModal();
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={openModal} onClose={handleModalClose}>
      <DialogTitle disableTypography>
        <Typography variant="h5">Remove this brother</Typography>
        <CloseModalButton onClick={handleModalClose}>
          <CloseIcon />
        </CloseModalButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you want to remove this brother from the list?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleSubmit}>
          Yes
        </Button>
        <Button variant="outlined" onClick={handleSubmit}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
