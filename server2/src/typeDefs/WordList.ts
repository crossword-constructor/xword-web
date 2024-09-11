import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class WordList {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name?: string
}

@ObjectType()
export class Word {
  @Field(() => ID)
  id!: string

  @Field(() => ID)
  wordListId!: string

  @Field(() => String)
  text?: string

  @Field(() => Int)
  score?: number
}
