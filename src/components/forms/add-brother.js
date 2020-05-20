import React, { useState } from 'react';
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
  const {
    openAddModal,
    updateOpenAddModal,
    updateNickName,
    updateName,
    updateSurename,
    handleSubmit
  } = props;

  const [disabledSubmit, updateDisabledSubmit] = useState(true);

  function updateNick(ev) {
    const nickNameFieldValue = ev.target.value;
    updateDisabledSubmit(nickNameFieldValue.length < 3 ? true : false);
    updateNickName(nickNameFieldValue);
  }

  return (
    <Dialog open={openAddModal} onClose={() => updateOpenAddModal(false)}>
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
            onChange={updateNick}
          />
          <InputText
            id="name"
            label="Name"
            fullWidth
            onChange={ev => {
              updateName(ev.target.value);
            }}
          />
          <InputText
            id="suremane"
            label="Surename"
            fullWidth
            onChange={ev => {
              updateSurename(ev.target.value);
            }}
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
