import { gql } from 'apollo-server-express';

export default gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  # these will probably differentiate in the future so dont worry about lack of DRY
  interface QueryResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;
