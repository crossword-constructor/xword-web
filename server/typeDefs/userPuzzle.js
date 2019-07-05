import { gql } from 'apollo-server-express';

export default gql`
  # extend type Query {
  #   playablePuzzle(id: ID): PlayablePuzzle!
  #   puzzles(month: String, year: String): [Puzzle!]
  # }
  extend type Mutation {
    updateUserPuzzle(
      _id: ID!
      board: [[String!]]
      time: Float
      revealedCells: [[Float]]
      isRevealed: Boolean
      isSolved: Boolean
    ): UserPuzzle!
  }
  type UserPuzzle {
    _id: ID!
    puzzle: Puzzle!
    board: [[String]]!
    revealedCells: [[Float]]
    isRevealed: Boolean
    isSolved: Boolean
    user: String
    time: Float
  }

  type Stats {
    total: Float!
  }
`;
