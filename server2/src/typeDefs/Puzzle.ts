import { Field, ObjectType, ID, InputType, ArgsType } from 'type-graphql'
import { QueryResponse, MutationResponse } from './Response'
import { UserPuzzle, Dimensions } from './UserPuzzle'
import { User } from './User'

@ObjectType()
export class Puzzle {
  @Field(() => ID)
  id!: string

  @Field({ nullable: true })
  editor?: string

  @Field({ nullable: true })
  author?: string

  @Field({ nullable: true })
  publisher?: string

  @Field({ nullable: true })
  date?: string

  @Field({ nullable: true })
  title?: string

  @Field(() => Dimensions, { nullable: true })
  dimensions?: Dimensions

  @Field(() => [ClueAnswer], { nullable: true })
  clues?: ClueAnswer[]

  @Field(() => [Cell], { nullable: true })
  board?: Cell[]

  @Field({ nullable: true })
  createdAt?: string

  @Field({ nullable: true })
  updatedAt?: string

  @Field()
  privacySetting?: string

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[]
}

@ObjectType()
export class PlayablePuzzle {
  @Field(() => Puzzle)
  puzzle?: Puzzle

  @Field(() => UserPuzzle)
  userPuzzle?: UserPuzzle
}

@ObjectType()
export class Cell {
  @Field({ nullable: true })
  text?: string

  @Field({ nullable: true })
  style?: string
}

@ObjectType()
export class Clue {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field({ nullable: true })
  text?: string
}

@ObjectType()
export class Answer {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field({ nullable: true })
  text?: string
}

@ObjectType()
export class ClueAnswer {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => Answer, { nullable: true })
  answer?: Answer

  @Field(() => Clue, { nullable: true })
  clue?: Clue

  @Field({ nullable: true })
  position?: string
}

@InputType()
export class ClueAnswerInput {
  @Field()
  answer!: string

  @Field()
  clue!: string

  @Field()
  position!: string
}

@ObjectType()
export class Comment {
  @Field(() => ID)
  id!: string

  @Field(() => User)
  author?: User

  @Field(() => Puzzle)
  puzzle?: Puzzle

  @Field()
  text?: string

  @Field()
  date?: string
}

@ArgsType()
export class PlayablePuzzleInput {
  @Field(() => ID)
  id!: string
}

@InputType()
export class CreatePuzzleInput {
  @Field({ nullable: true })
  editor?: string

  @Field({ nullable: true })
  author?: string

  @Field({ nullable: true })
  publisher?: string

  @Field({ nullable: true })
  date?: string

  @Field({ nullable: true })
  title?: string

  @Field(() => Cell)
  board!: string

  @Field()
  width!: number
}
@ObjectType({ implements: QueryResponse })
export class PlayablePuzzleResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => PlayablePuzzle, { nullable: true })
  playablePuzzle?: PlayablePuzzle
}

@ObjectType({ implements: QueryResponse })
export class PuzzlesResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => [Puzzle], { nullable: true })
  puzzles?: Puzzle[]
}

@ObjectType({ implements: QueryResponse })
export class PuzzleResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => Puzzle, { nullable: true })
  puzzle?: Puzzle
}

@ObjectType({ implements: MutationResponse })
export class CreatePuzzleResponse {
  @Field()
  code!: string

  @Field()
  success!: boolean

  @Field()
  message!: string

  @Field(() => Puzzle, { nullable: true })
  puzzle?: Puzzle
}
