import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './Login.module.css';

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [step, setStep] = useState(0);

  const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        _id
        username
        solvedPuzzles {
          _id
          puzzle {
            _id
          }
          board
        }
      }
    }
  `;

  const form = [
    {
      name: 'Username',
      value: username,
      type: 'text',
      onChange: e => setUsername(e.target.value),
    },
    {
      name: 'Password',
      value: password,
      type: 'password',
      onChange: e => setPassword(e.target.value),
    },
  ];
  return (
    <div className={styles.page}>
      <PuzzleIcon />
      <form className={styles.form}>
        {form.map(formItem => (
          <Input key={formItem.name} {...formItem} theme="Big" />
        ))}
        <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
          {(login, res) => {
            // let errorComponent = null;
            if (res.error) {
              console.log(res.error);
              // errorComponent = <div>{res.error.graphQLErrors[0].message}</div>;
            } else if (res.data) {
              history.push('/profile');
            }
            return (
              <div>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    login({
                      variables: { username, password },
                    });
                  }}
                  type="submit"
                  theme="Main"
                >
                  Login
                </Button>
              </div>
            );
          }}
        </Mutation>
        <div>
          Don&apos;t have an account yet? <Link to="/signup">signup</Link>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
export default Login;
