import { ClueAnswerPairJSON } from '../db/JSONtypes'
import { ClueAnswer } from '../typeDefs/Puzzle'

export const clueAnswerPairJSONToGql = (
  clueAnswerPair: ClueAnswerPairJSON
): ClueAnswer => {
  return {
    position: clueAnswerPair.position,
    clue: {
      id: clueAnswerPair.clueId,
      text: clueAnswerPair.clueText,
    },
    answer: {
      id: clueAnswerPair.answerId,
      text: clueAnswerPair.answerText,
    },
  }
}
