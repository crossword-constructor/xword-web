import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
    puzzle(id: ID!): User @auth
    puzzles: [User!]!
  }

  extend type Mutation {
    createPuzzle(
      clues: [Clue!]
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
    cluesAnswer: [ClueAnswer!]!
    board: []
    createdAt: Date!
    updatedAt: Date!
  }

  type ClueAnswer {
    id: ID!
    clue: Clue!
    answer: Answer!
    position: String! # 1A or 61D e.g.
  }

  type Clue {
    id: ID!
    text: String!
    answers: {
      answer: Answer!
      count: Number!
    }
    puzzles: [Puzzle!]!
  }

  type Answer {
    id: ID!
    text: String!
    clues: {
      clue: Clue!
      count: Number!
    }
    puzzles: [Puzzle!]!
  }

`;
