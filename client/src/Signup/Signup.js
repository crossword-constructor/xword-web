import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import useErrorMessage from '../Hooks/useErrorMessage';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './Signup.module.css';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useErrorMessage(null);

  const SIGNUP_MUTATION = gql`
    mutation signup(
      $email: String!
      $username: String!
      $name: String!
      $password: String!
    ) {
      signup(
        email: $email
        username: $username
        name: $name
        password: $password
      ) {
        success
        message
        code
        user {
          _id
          username
        }
      }
    }
  `;

  const form = [
    {
      name: 'Full Name',
      value: name,
      type: 'text',
      onChange: e => setName(e.target.value),
    },
    {
      name: 'Username',
      value: username,
      type: 'text',
      onChange: e => setUsername(e.target.value),
    },
    {
      name: 'Email',
      value: email,
      type: 'email',
      onChange: e => setEmail(e.target.value),
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
      <div className={styles.CenterRow}>
        <form className={styles.form}>
          {form.map(formItem => (
            <Input key={formItem.name} theme="Big" {...formItem} />
          ))}
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ username, email, password, name }}
            update={(_, { data, error }) => {
              console.log({ data, error });
              if (data) {
                const {
                  signup: { success, message, user },
                } = data;
                if (!success && message) {
                  setErrorMessage(message);
                } else if (user) {
                  history.push('/profile');
                }
              } else if (error) {
                setErrorMessage('Internal Server Error');
              }
            }}
          >
            {signup => {
              return (
                <>
                  <div>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        signup({
                          variables: { email, username, password, name },
                          refetchQueries: ['USERNAME'],
                        });
                      }}
                      type="submit"
                      theme="Main"
                    >
                      Signup
                    </Button>
                  </div>
                  {/* @todo abstract this out */}
                  <div
                    className={
                      errorMessage ? styles.ErrorMessage : styles.HiddenMessage
                    }
                  >
                    {errorMessage}
                  </div>
                </>
              );
            }}
          </Mutation>
          <div>
            Already have an account? <Link to="/login">login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
export default Signup;
