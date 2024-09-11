import { gql } from 'apollo-server-express'

import { ObjectType, Field, ID, ArgsType, InputType } from 'type-graphql'
import { MutationResponse, QueryResponse } from './Response' // Adjust the import path as necessary
import { Puzzle } from './Puzzle'
import { UserPuzzle, Stats } from './UserPuzzle'
import { Notification } from './Notification'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  createdAt?: string

  @Field(() => [UserPuzzle], { nullable: true })
  solvedPuzzles?: UserPuzzle[]

  @Field(() => Stats, { nullable: true })
  solvedPuzzleStats?: Stats

  @Field(() => [UserPuzzle], { nullable: true })
  createdPuzzles?: UserPuzzle[]

  @Field(() => Stats, { nullable: true })
  stats?: Stats

  @Field(() => [User], { nullable: true })
  friends?: User[]

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[]
}

@ObjectType({ implements: QueryResponse })
export class UserResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => User)
  user?: User
}

@ObjectType({ implements: MutationResponse })
export class AuthenticationResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => User, { nullable: true })
  user?: User
}

@ArgsType()
export class UserLoginInput {
  @Field()
  username!: string
  @Field()
  password!: string
}

@InputType()
export class UserSignupInput {
  @Field()
  username!: string
  @Field()
  password!: string
  @Field()
  firstName!: string
  @Field()
  lastName!: string
}
