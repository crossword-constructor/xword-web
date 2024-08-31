import { ObjectType, Field, ID } from 'type-graphql'
import { Puzzle } from './Puzzle'
import { User } from './User'

@ObjectType()
export class Notification {
  @Field(() => ID)
  id!: string

  @Field(() => User, { nullable: true })
  fromUser?: User

  @Field(() => User)
  toUser!: User

  @Field({ nullable: true })
  message?: string

  @Field(() => Puzzle, { nullable: true })
  puzzle?: Puzzle
}
