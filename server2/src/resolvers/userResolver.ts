import { Resolver, Query, Mutation, Args, Arg, Ctx } from 'type-graphql'
import {
  PlayablePuzzle,
  PlayablePuzzleInput,
  PlayablePuzzleResponse,
  PuzzlesResponse,
} from '../typeDefs/Puzzle'
import { User, UserLoginInput, UserSignupInput } from '../typeDefs/User'
import { UserPuzzle } from '../typeDefs/UserPuzzle'
import { Puzzle, GetPuzzlesByMonthArgs } from '../typeDefs/Puzzle'
import { IGraphQLContext } from '../types/types'
import { generateResponse } from '../utils/response'
import { UserModel } from '../models/UserModel'
import { UserPuzzleModel } from '../models/UserPuzzleModel'
import jwt from 'jsonwebtoken'
import { PuzzleJSON, UserJSON } from '../db/JSONtypes'
import { IN_PROD, JWT_SECRET } from '../config'
@Resolver()
export class UserResolver {
  constructor() {}
  @Mutation(() => User)
  async login(
    @Args() { username, password }: UserLoginInput,
    @Ctx() context: IGraphQLContext
  ): Promise<User> {
    const userModel = new UserModel()
    const user = await userModel.login(username, password)
    issueToken(user, context.res)

    return user
  }

  @Mutation(() => User)
  async signup(
    @Arg('user') signupData: UserSignupInput // @Ctx() { user }: IGraphQLContext
  ): Promise<User> {
    const userModel = new UserModel()
    const user = await userModel.signup(signupData)
    console.log({ user })
    return user
  }
}

const issueToken = (user: UserJSON, res: any) => {
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: '2d',
  })
  res.cookie('user', token, {
    httpOnly: true,
    secure: IN_PROD,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  })
  console.log('setting res.cookie')
}
