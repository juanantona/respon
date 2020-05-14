import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BrothersList from '../../components/brothers-list';
import Copyright from '../../components/copyright';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const apiEndpoint = 'http://localhost:3000/brothers';

const ControlsWrapper = styled(Box)({
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'flex-end'
});

const InputText = styled(TextField)({
  marginBottom: '16px'
});

export default function BrothersListPage() {
  const [openAddModal, updateOpenAddModal] = useState(false);
  const [nickName, updateNickName] = useState('');
  const [name, updateName] = useState('');
  const [suremane, updateSurename] = useState('');
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

  function BrothersListControls() {
    return (
      <ControlsWrapper>
        <Button onClick={() => updateOpenAddModal(true)} variant="contained">
          Add brother
        </Button>
      </ControlsWrapper>
    );
  }

  function handleSubmit() {
    const body = JSON.stringify({ nick_name: nickName, name, suremane });

    try {
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
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
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Brothers List
        </Typography>
        <BrothersListControls />
        <Dialog open={openAddModal} onClose={() => updateOpenAddModal(false)}>
          <DialogTitle>Add a new brother</DialogTitle>
          <DialogContent>
            <form>
              <InputText
                autoFocus
                id="nickName"
                required
                label="Nick Name"
                fullWidth
                onChange={ev => {
                  updateNickName(ev.target.value);
                }}
              />
              <InputText
                id="name"
                required
                label="Name"
                fullWidth
                onChange={ev => {
                  updateName(ev.target.value);
                }}
              />
              <InputText
                id="suremane"
                required
                label="Surename"
                fullWidth
                onChange={ev => {
                  updateSurename(ev.target.value);
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <BrothersList brothers={brothers} />
        <Copyright />
      </Box>
    </Container>
  );
}
