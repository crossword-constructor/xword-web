import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// import { Redirect } from 'react-router-dom';

const Logout = () => {
  const LOGOUT = gql`
    mutation {
      signout {
        success
        message
      }
    }
  `;

  // useEffect(() => {
  //   client
  //     .mutate({ mutation: LOGOUT })
  //     .then(() => {
  //       client.cache.reset();
  //       history.push('/');
  //     })
  //     .catch(() => {
  //       // return <div>error</div>;
  //     });
  // }, [LOGOUT, client, history]);

  return <div>Loading</div>;
};

Logout.propTypes = {
  // client: PropTypes.shape({ mutate: PropTypes.func.isRequired }).isRequired,
  // history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default Logout;
