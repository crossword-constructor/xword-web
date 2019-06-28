import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
// import { Redirect } from 'react-router-dom';

const Logout = ({ client, history }) => {
  const LOGOUT = gql`
    mutation {
      signout {
        loggedIn
      }
    }
  `;

  useEffect(() => {
    client
      .mutate({ mutation: LOGOUT })
      .then(() => {
        client.cache.reset();
        history.push('/');
      })
      .catch(() => {
        // return <div>error</div>;
      });
  }, []);

  return <div>Loading</div>;
};

Logout.propTypes = {
  client: PropTypes.shape({ mutate: PropTypes.func.isRequired }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default withRouter(withApollo(Logout));
