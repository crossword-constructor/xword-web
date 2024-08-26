import { gql } from 'apollo-server-express';

import { ObjectType, Field, ID } from "type-graphql";
import { MutationResponse, QueryResponse } from "./response";  // Adjust the import path as necessary
import { Puzzle } from './puzzle'
import { UserPuzzle, Stats } from './userPuzzle'

@ObjectType({ implements: MutationResponse })
export class AuthenticationResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType({ implements: QueryResponse })
export class UserResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => User)
  user?: User;
}

@ObjectType()
export class User {
  @Field(() => ID)
  _id!: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field(() => [UserPuzzle], { nullable: true })
  solvedPuzzles?: UserPuzzle[];

  @Field(() => Stats, { nullable: true })
  solvedPuzzleStats?: Stats;

  @Field(() => [UserPuzzle], { nullable: true })
  createdPuzzles?: UserPuzzle[];

  @Field(() => Stats, { nullable: true })
  stats?: Stats;

  @Field(() => [User], { nullable: true })
  friends?: User[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];
}

@ObjectType()
export class Notification {
  @Field(() => ID)
  _id!: string;

  @Field(() => User, { nullable: true })
  fromUser?: User;

  @Field(() => User)
  toUser!: User;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Puzzle, { nullable: true })
  puzzle?: Puzzle;
}
// export default gql`
//   extend type Query {
//     verifyLoggedIn: User
//     me: User
//     profileInfo(solvedCursor: String, constructedCursor: String): UserResponse
//     user(id: ID!): User @auth
//     users: [User!]!
//   }

//   extend type Mutation {
//     signup(
//       email: String!
//       username: String!
//       name: String!
//       password: String!
//     ): AuthenticationResponse
//     login(username: String!, password: String!): AuthenticationResponse
//     signout: AuthenticationResponse
//   }

//   type AuthenticationResponse implements MutationResponse {
//     code: String!
//     success: Boolean!
//     message: String!
//     user: User
//   }

//   type UserResponse implements QueryResponse {
//     code: String!
//     success: Boolean!
//     message: String!
//     user: User!
//   }

//   type User {
//     _id: ID!
//     email: String
//     username: String
//     name: String
//     createdAt: String
//     solvedPuzzles: [UserPuzzle]
//     solvedPuzzleStats: Stats
//     createdPuzzles: [UserPuzzle]
//     stats: Stats
//     friends: [User]
//     notifications: [Notification]
//   }

//   type Notification {
//     _id: ID!
//     fromUser: User
//     toUser: User!
//     message: String
//     puzzle: Puzzle
//   }
// `;
