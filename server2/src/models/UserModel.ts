import { hashSync, genSaltSync, compareSync } from 'bcrypt'
import { CreatePuzzleInput } from '../typeDefs/Puzzle'
import { KnexModel } from './KnexModel'
import { UserJSON } from '../db/JSONtypes'
import { UserSignupInput } from '../typeDefs/User'

const salt = genSaltSync(10)
export class UserModel extends KnexModel {
  protected static readonly tableName = 'users'

  constructor() {
    super(UserModel.tableName)
  }

  async createUser(signupData: UserSignupInput): Promise<UserJSON> {
    // convert string date to date?
    const { username, password, firstName, lastName } = signupData
    const hashedPassword = await hashSync(password, salt)
    const result = await super.create({
      username,
      firstName,
      lastName,
      hashedPassword,
    })
    return result as UserJSON
  }

  async login(username: string, password: string): Promise<UserJSON> {
    const user = await super.findOne<UserJSON>({ username })
    console.log({ user })
    console.log({ password: user.hashedPassword })
    if (!compareSync(password, user.hashedPassword)) {
      throw new Error('Username or Password did not match')
    }
    return user
  }

  async signup(signupData: UserSignupInput) {
    return (await this.createUser(signupData)) as UserJSON
  }
}
