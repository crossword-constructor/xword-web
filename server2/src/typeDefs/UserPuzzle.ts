// import { gql } from 'apollo-server-express';
import { ObjectType, Field, ID, Int, Float } from 'type-graphql'
import { QueryResponse } from './Response'
import { Puzzle, Cell } from './Puzzle'

@ObjectType({ implements: QueryResponse })
export class UserPuzzleResponse implements QueryResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => [UserPuzzle], { nullable: true })
  solvedPuzzles?: UserPuzzle[]
}

@ObjectType()
export class Dimensions {
  @Field(() => Int, { nullable: true })
  width?: number

  @Field(() => Int, { nullable: true })
  height?: number
}

@ObjectType()
export class Stats {
  @Field(() => Float)
  total!: number

  @Field(() => Float)
  solved!: number

  @Field(() => Float)
  revealed!: number
}

@ObjectType()
export class UserPuzzle {
  @Field(() => ID)
  _id!: string

  @Field(() => Puzzle)
  puzzle?: Puzzle

  @Field(() => [Cell])
  board?: Cell[]

  @Field(() => [[Float]], { nullable: true })
  revealedCells?: number[][]

  @Field(() => Dimensions, { nullable: true })
  dimensions?: Dimensions

  @Field({ nullable: true })
  isRevealed?: boolean

  @Field({ nullable: true })
  isSolved?: boolean

  @Field({ nullable: true })
  user?: string

  @Field(() => Float, { nullable: true })
  time?: number

  @Field({ nullable: true })
  updatedAt?: string
}

// export default gql`
//   extend type Query {
//     getSolvedPuzzles(cursor: String): UserPuzzleResponse!
//     # playablePuzzle(id: ID): PlayablePuzzle!
//     # puzzles(month: String, year: String): [Puzzle!]
//   }

//   extend type Mutation {
//     updateUserPuzzle(
//       _id: ID!
//       board: [[String!]]
//       time: Float
//       revealedCells: [[Float]]
//       isRevealed: Boolean
//       isSolved: Boolean
//     ): UserPuzzle!
//   }

//   type UserPuzzleResponse implements QueryResponse {
//     message: String!
//     success: Boolean!
//     code: String!
//     solvedPuzzles: [UserPuzzle]
//   }

//   type UserPuzzle {
//     _id: ID!
//     puzzle: Puzzle!
//     board: [Cell]!
//     revealedCells: [[Float]]
//     dimensions: Dimensions
//     isRevealed: Boolean
//     isSolved: Boolean
//     user: String
//     time: Float
//     updatedAt: String
//   }

//   type Dimensions {
//     width: Int
//     height: Int
//   }

//   type Stats {
//     total: Float!
//     solved: Float!
//     revealed: Float!
//   }
// `;
