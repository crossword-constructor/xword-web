import { gql } from 'apollo-server-express';
import { Field, ObjectType, ID, InterfaceType, InputType } from 'type-graphql'
import { ClassificationTypeNames } from 'typescript';
import { QueryResponse, MutationResponse} from './response'
import { UserPuzzle, Dimensions } from './userPuzzle';
import { User } from './user';



@ObjectType({ implements: QueryResponse })
export class PlayablePuzzleResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => PlayablePuzzle, { nullable: true })
  playablePuzzle?: PlayablePuzzle;
}

@ObjectType({ implements: QueryResponse })
export class PuzzlesResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => [Puzzle], { nullable: true })
  puzzles?: Puzzle[];
}

@ObjectType({ implements: QueryResponse })
export class PuzzleResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => Puzzle, { nullable: true })
  puzzle?: Puzzle;
}

@ObjectType({ implements: MutationResponse })
export class CreatePuzzleResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;

  @Field(() => Puzzle, { nullable: true })
  puzzle?: Puzzle;
}

@ObjectType()
export class PlayablePuzzle {
  @Field(() => Puzzle)
  puzzle?: Puzzle;

  @Field(() => UserPuzzle)
  userPuzzle?: UserPuzzle;
}

@ObjectType()
export class Puzzle {
  @Field(() => ID)
  _id!: string;

  @Field({ nullable: true })
  editor?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Dimensions, { nullable: true })
  dimensions?: Dimensions;

  @Field(() => [ClueAnswer], { nullable: true })
  clues?: ClueAnswer[];

  @Field(() => [Cell], { nullable: true })
  board?: Cell[];

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field()
  privacySetting?: string;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];
}

@ObjectType()
export class Cell {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  style?: string;
}

@ObjectType()
export class ClueAnswer {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => Answer, { nullable: true })
  answer?: Answer;

  @Field(() => Clue, { nullable: true })
  clue?: Clue;

  @Field({ nullable: true })
  position?: string;
}

@ObjectType()
export class Clue {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  text?: string;
}

@ObjectType()
export class Answer {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  text?: string;
}

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id!: string;

  @Field(() => User)
  author?: User;

  @Field(() => Puzzle)
  puzzle?: Puzzle;

  @Field()
  text?: string;

  @Field()
  date?: string;
}
export default gql`
  extend type Query {
    playablePuzzle(_id: ID): PlayablePuzzleResponse!
    todaysPuzzle(date: String!): PuzzleResponse!
    puzzles(month: String, year: String): PuzzlesResponse!
  }

  extend type Mutation {
    createPuzzle(
      username: String!
      name: String!
      password: String!
    ): CreatePuzzleResponse
  }

  type PlayablePuzzleResponse implements QueryResponse {
    code: String!
    success: Boolean!
    message: String!
    playablePuzzle: PlayablePuzzle
  }

  type PuzzlesResponse implements QueryResponse {
    code: String!
    success: Boolean!
    message: String!
    puzzles: [Puzzle]
  }

  type PuzzleResponse implements QueryResponse {
    code: String!
    success: Boolean!
    message: String!
    puzzle: Puzzle
  }
  type CreatePuzzleResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    puzzle: Puzzle
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
    dimensions: Dimensions
    clues: [ClueAnswer]
    board: [Cell]
    createdAt: String!
    updatedAt: String
    privacySetting: String!
    comments: [Comment]
  }

  type Cell {
    text: String
    style: String
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
