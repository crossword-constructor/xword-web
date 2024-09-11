import { PlayablePuzzleResponse } from '../typeDefs/Puzzle'

export const generateResponse = (
  payload: object,
  error: any
): PlayablePuzzleResponse => {
  if (error) {
    return {
      code: '500',
      message: error.message || 'Internal Server Error',
      success: false,
    } as PlayablePuzzleResponse
  }
  return {
    message: 'success',
    success: true,
    code: '200',
    ...payload,
  } as PlayablePuzzleResponse
}
