import React, { SyntheticEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
// import useErrorMessage from '../Hooks/useErrorMessage';
// import ErrorToast from '../Shared/ErrorToast';
// import Button from '../Shared/Button';
// import Input from '../Shared/Input';
import styled from '@emotion/styled';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      firstName
      lastName
    }
  }
`;

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useErrorMessage(null);
  const [login] = useMutation(LOGIN_MUTATION);

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ username, password });
    login({
      variables: {
        username,
        password,
      },
    });
  };
  return (
    <Container>
      <h1>Login</h1>
      <TextField
        id="username"
        label="Username"
        onChange={handleUsernameChange}
      />
      <TextField
        type="password"
        id="password"
        label="Password"
        onChange={handlePasswordChange}
      />
      <Button color="primary" variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 50%;
  width: 33%;
  justify-content: space-between;
  align-items: center;
`;
