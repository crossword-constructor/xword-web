import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    puzzle(id: ID): Puzzle!
    puzzles(month: String, year: String): [Puzzle!]
  }

  extend type Mutation {
    createPuzzle(
      clues: String!
      username: String!
      name: String!
      password: String!
    ): Puzzle
  }

  type Puzzle {
    id: ID!
    editor: String
    author: String
    publisher: String
    date: String
    title: String
    clues: [Clue]
    # cluesAnswer: [ClueAnswer!]!
    board: [[String]]
    # createdAt: String!
    # updatedAt: String!
    # privacySetting: String!
  }

  type Clue {
    answer: String!
    clue: String!
    position: String!
    # answers: {
    #   answer: Answer!
    #   count: Number!
    # }
  }
`;
