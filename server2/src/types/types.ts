export interface IGraphQLContext {
  user: {
    isAdmin: boolean
    id: string
  }
  res: any
  req: any
}
