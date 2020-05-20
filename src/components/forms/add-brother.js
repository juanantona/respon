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

export default function AddBrotherForm(props) {
  const { openAddModal, updateOpenAddModal, updateBrothers } = props;
  const [disabledSubmit, updateDisabledSubmit] = useState(true);
  const [brother, updateBrother] = useState({});

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
    updateOpenAddModal(false);
  }

  function handleSubmit() {
    const { nickName, name, suremane } = brother;
    const newBrotherToAPI = { nick_name: nickName, name, suremane };

    try {
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBrotherToAPI)
      })
        .then(response => response.json())
        .then(data => {
          updateBrothers(data);
          updateOpenAddModal(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={openAddModal} onClose={handleModalClose}>
      <DialogTitle disableTypography>
        <Typography variant="h5">Add a new brother</Typography>
        <CloseModalButton onClick={() => updateOpenAddModal(false)}>
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
            onChange={handleChange}
          />
          <InputText id="name" label="Name" fullWidth onChange={handleChange} />
          <InputText
            id="suremane"
            label="Surename"
            fullWidth
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
          Add new brother
        </Button>
      </DialogActions>
    </Dialog>
  );
}
