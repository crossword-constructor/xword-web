import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    playablePuzzle(id: ID): PlayablePuzzle!
    puzzles(month: String, year: String): [Puzzle!]
  }

  extend type Mutation {
    createPuzzle(username: String!, name: String!, password: String!): Puzzle

    # updatePuzzle(
    #   board: [[String]]
    # ): Puzzle
  }

  type PlayablePuzzle {
    puzzle: Puzzle!
    userPuzzle: UserPuzzle!
  }

  type Puzzle {
    _id: ID!
    editor: String
    author: String
    publisher: String
    date: String
    title: String
    clues: [ClueAnswer]
    board: [[String]]
    createdAt: String!
    updatedAt: String
    privacySetting: String!
    comments: [Comment]
  }

  type UserPuzzle {
    _id: ID!
    puzzle: String!
    board: [[String]]!
    user: String
  }

  type ClueAnswer {
    _id: ID
    answer: Answer
    clue: Clue
    position: String
  }

  type Clue {
    _id: ID
    text: String
  }

  type Answer {
    _id: ID
    text: String
  }

  type Comment {
    _id: ID!
    author: User!
    puzzle: Puzzle!
    text: String!
    date: String!
  }
`;
