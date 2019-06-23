import { gql } from 'apollo-server-express';

export default gql`
  # extend type Query {
  #   playablePuzzle(id: ID): PlayablePuzzle!
  #   puzzles(month: String, year: String): [Puzzle!]
  # }
  extend type Mutation {
    updateUserPuzzle(_id: ID!, board: [[String!]]): Response
  }

  type Response {
    message: String!
  }

  type UserPuzzle {
    _id: ID!
    puzzle: String!
    board: [[String]]!
    user: String
  }
`;
