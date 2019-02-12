import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    puzzle(id: ID): Puzzle
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
    # cluesAnswer: [ClueAnswer!]!
    board: [[String]]
    # createdAt: String!
    # updatedAt: String!
    # privacySetting: String!
  }

  type Clue {
    id: ID!
    text: String!
    # answers: {
    #   answer: Answer!
    #   count: Number!
    # }
    puzzles: [Puzzle!]!
  }

  # type Answer {
  #   id: ID!
  #   text: String!
  #   clues: {
  #     clue: Clue!
  #     count: Number!
  #   }
  #   puzzles: [Puzzle!]!
  # }

  # type ClueAnswer {
  #   id: ID!
  #   clue: Clue!
  #   answer: Answer!
  #   position: String! # 1A or 61D e.g.
  # }
`;
