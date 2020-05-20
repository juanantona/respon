import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BrothersList from '../../components/brothers-list';
import Copyright from '../../components/copyright';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddBrotherForm from '../../components/forms/add-brother';

const apiEndpoint = 'http://localhost:3000/brothers';

const ControlsWrapper = styled(Box)({
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'flex-end'
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
          <AddIcon />
        </Button>
      </ControlsWrapper>
    );
  }

  function handleSubmit() {
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
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Brothers List
        </Typography>
        <BrothersListControls />
        <AddBrotherForm
          openAddModal={openAddModal}
          updateOpenAddModal={updateOpenAddModal}
          updateNickName={updateNickName}
          updateName={updateName}
          updateSurename={updateSurename}
          handleSubmit={handleSubmit}
        />
        <BrothersList brothers={brothers} />
        <Copyright />
      </Box>
    </Container>
  );
}
