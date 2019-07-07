import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    verifyLoggedIn: User
    me: User
    profileInfo(solvedCursor: String, constructedCursor: String): UserResponse
    user(id: ID!): User @auth
    users: [User!]!
  }

  extend type Mutation {
    signup(
      email: String!
      username: String!
      name: String!
      password: String!
    ): AuthenticationResponse
    login(username: String!, password: String!): AuthenticationResponse
    signout: AuthenticationResponse
  }

  type AuthenticationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type UserResponse implements QueryResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User!
  }

  type User {
    _id: ID!
    email: String
    username: String
    name: String
    createdAt: String
    solvedPuzzles: [UserPuzzle]
    solvedPuzzleStats: Stats
    createdPuzzles: [UserPuzzle]
    stats: Stats
    friends: [User]
    notifications: [Notification]
  }

  type Notification {
    _id: ID!
    fromUser: User
    toUser: User!
    message: String
    puzzle: Puzzle
  }
`;
