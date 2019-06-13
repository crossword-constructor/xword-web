import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    verifyLoggedIn: User
    me: User
    user(id: ID!): User @auth
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      email: String!
      username: String!
      name: String!
      password: String!
    ): User!
    signIn(email: String!, password: String!): User
    signOut: Boolean @auth
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
    solvedPuzzles: [UserPuzzle]
    createdPuzzles: [UserPuzzle]
    stats: Stats
    friends: [User]
    notifications: [Notification]
  }

  type AuthPayload {
    loggedIn: Boolean!
  }

  type UserPuzzle {
    id: ID!
    puzzle: Puzzle
    currentBoard: [[String]]
    startTime: String!
    endTime: String
  }

  type Notification {
    id: ID!
    fromUser: User
    toUser: User!
    message: String
    puzzle: Puzzle
  }

  type Stats {
    averageSolveTime: Float
    noSolved: Float
    noAttempted: Float
  }
`;
