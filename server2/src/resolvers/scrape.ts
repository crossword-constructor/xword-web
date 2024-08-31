// @TODO @IMPORTANT Put This Behind Admin Permission

import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { scrape } from '../scripts/scrapeNYTPuzzles'
@Resolver()
export class ScrapeResolver {
  constructor() {}
  @Query(() => Boolean)
  async scrape(): Promise<Boolean> {
    try {
      await scrape(`/Crossword?date=8/29/2024`)
      return true
    } catch (err) {
      console.log({ err })
      return false
    }
  }
}
