import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const apiEndpoint = 'http://localhost:3000/brothers';

const InputText = styled(TextField)({
  marginBottom: '16px'
});

const CloseModalButton = styled(IconButton)({
  position: 'absolute',
  top: '0',
  right: '0',
  margin: '8px'
});

export default function EditBrotherForm(props) {
  const { brotherId, updateBrothers, handleHideEditForm } = props;
  const [disabledSubmit, updateDisabledSubmit] = useState(true);
  const [openEditForm, updateOpenEditForm] = useState(false);
  const [brother, updateBrother] = useState({});

  useEffect(() => {
    try {
      fetch(`${apiEndpoint}/${brotherId}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(brotherData => {
          const { nick_name, name, suremane } = brotherData;
          updateBrother({ nickName: nick_name, name, suremane });
          updateOpenEditForm(true);
        });
    } catch (error) {
      console.error(error);
    }
  }, [brotherId]);

  useEffect(() => {
    const nickName = brother['nickName'] || '';
    updateDisabledSubmit(true);
    if (nickName.length >= 3) {
      updateDisabledSubmit(false);
    }
  }, [brother]);

  function handleChange(ev) {
    const { id, value } = ev.target;
    updateBrother({ ...brother, [id]: value });
  }

  function handleModalClose() {
    updateDisabledSubmit(true);
    handleHideEditForm();
  }

  function handleSubmit() {
    const { nickName, name, suremane } = brother;
    const newBrotherToAPI = { nick_name: nickName, name, suremane };

    try {
      fetch(`${apiEndpoint}/${brotherId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBrotherToAPI)
      })
        .then(response => response.json())
        .then(data => {
          updateBrothers(data);
          handleModalClose();
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={openEditForm} onClose={handleModalClose}>
      <DialogTitle disableTypography>
        <Typography variant="h5">Edit this brother</Typography>
        <CloseModalButton onClick={handleModalClose}>
          <CloseIcon />
        </CloseModalButton>
      </DialogTitle>
      <DialogContent>
        <form>
          <InputText
            autoFocus
            id="nickName"
            required
            label="Nick Name"
            fullWidth
            defaultValue={brother.nickName}
            onChange={handleChange}
          />
          <InputText
            id="name"
            label="Name"
            fullWidth
            defaultValue={brother.name}
            onChange={handleChange}
          />
          <InputText
            id="suremane"
            label="Surename"
            fullWidth
            defaultValue={brother.suremane}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={disabledSubmit}
          variant="outlined"
          onClick={handleSubmit}
        >
          Update brother
        </Button>
      </DialogActions>
    </Dialog>
  );
}
