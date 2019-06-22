import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';

const WithApolloClient = ({ children }) => (
  <ApolloConsumer>{client => children(client)}</ApolloConsumer>
);

WithApolloClient.propTypes = {
  children: PropTypes.func.isRequired,
};

export default WithApolloClient;
