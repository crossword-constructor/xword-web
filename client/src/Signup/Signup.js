import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import Input from '../Shared/Input';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './Signup.module.css';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [step, setStep] = useState(0);

  const SIGNUP_MUTATION = gql`
    mutation signup(
      $email: String!
      $username: String!
      $name: String!
      $password: String!
    ) {
      signUp(
        email: $email
        username: $username
        name: $name
        password: $password
      ) {
        _id
        username
      }
    }
  `;

  const USERNAME = gql`
    {
      me {
        _id
        username
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
      <form className={styles.form}>
        {form.map(formItem => (
          <Input key={formItem.name} theme="Big" {...formItem} />
        ))}
        <Mutation
          mutation={SIGNUP_MUTATION}
          variables={{ username, email, password, name }}
          // eslint-disable-next-line no-unused-vars
          // refetchQueries={['USERNAME']}
          update={cache => {
            console.log('update ufnciton');
            const username2 = cache.readQuery({ query: USERNAME });
            console.log(username2);
          }}
        >
          {(signup, res) => {
            console.log({ res });
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
            );
          }}
        </Mutation>
        <div>
          Already have an account? <Link to="/login">login</Link>
        </div>
      </form>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
export default Signup;
