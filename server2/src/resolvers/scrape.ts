// @TODO @IMPORTANT Put This Behind Admin Permission

import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { scrape } from '../scripts/scrapeNYTPuzzles'
@Resolver()
export class ScrapeResolver {
  constructor() {}
  @Query(() => Boolean)
  async scrape(
    @Arg('date') date: string,
    @Arg('scrapeAll') scrapeAll: boolean
  ): Promise<Boolean> {
    try {
      await scrape(`/Crossword?date=${date}`, scrapeAll)
      return true
    } catch (err) {
      console.log({ err })
      return false
    }
  }
}
