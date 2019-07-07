import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getSolvedPuzzles(cursor: String): UserPuzzleResponse!
    # playablePuzzle(id: ID): PlayablePuzzle!
    # puzzles(month: String, year: String): [Puzzle!]
  }

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

  type UserPuzzleResponse implements QueryResponse {
    message: String!
    success: Boolean!
    code: String!
    solvedPuzzles: [UserPuzzle]
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
    updatedAt: String
  }

  type Stats {
    total: Float!
    solved: Float!
    revealed: Float!
  }
`;
