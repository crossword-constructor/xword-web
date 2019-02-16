import React, { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";

import gql from "graphql-tag";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);

  const SIGNUP_MUTATION = gql`
    mutation signUp(
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
        username
      }
    }
  `;

  return (
    <div className={styles.page}>
      <form className={styles.form}>
        <input
          type="text"
          name="name"
          value={name}
          className={step === 0 ? styles.activeStep : styles.hidden}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="username"
          value={username}
          className={step === 1 ? styles.activeStep : styles.hidden}
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          value={password}
          className={step === 2 ? styles.activeStep : styles.hidden}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          value={email}
          className={step === 3 ? styles.activeStep : styles.hidden}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <Mutation
          mutation={SIGNUP_MUTATION}
          variables={{ username, email, password, name }}
        >
          {(signUp, { data, error }) => {
            console.log(data);
            console.log(error);
            return (
              <div>
                <button
                  onClick={() =>
                    signUp({
                      variables: { email, username, password, name }
                    })
                  }
                >
                  Submit
                </button>
                {data ? data.signUp.username : null}
                {/* {Object.keys(error).map(key => key)} */}
              </div>
            );
          }}
        </Mutation>
      </form>
    </div>
  );
};

// export default Signup;
