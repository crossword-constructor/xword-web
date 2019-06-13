import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    puzzle(id: ID): Puzzle!
    puzzles(month: String, year: String): [Puzzle!]
  }

  extend type Mutation {
    createPuzzle(username: String!, name: String!, password: String!): Puzzle

    # updatePuzzle(
    #   board: [[String]]
    # ): Puzzle
  }

  type Puzzle {
    id: ID!
    editor: String
    author: String
    publisher: String
    date: String
    title: String
    clues: [Clue]
    board: [[String]]
    createdAt: String!
    updatedAt: String
    privacySetting: String!
    comments: [Comment]
  }

  type Clue {
    answer: Answer!
    clue: String!
    position: String!
    # answers: {
    #   answer: Answer!
    #   count: Number!
    # }
  }

  type Answer {
    id: ID!
    text: String!
  }

  type Comment {
    id: ID!
    author: User!
    puzzle: Puzzle!
    text: String!
    date: String!
  }
`;
