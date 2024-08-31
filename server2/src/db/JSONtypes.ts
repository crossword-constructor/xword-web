export interface PuzzleJSON {
  id: string
  name: string
  board: CellJSON[]
  width: number
  height: number
  date: string
}

interface CellJSON {
  text: string
  style: string
}

export interface WordJSON {
  id: string
  text: string
  score: number
  wordListId: string
}

export interface WordListJSON {
  name: string
  id: string
}

export interface OrderBy {
  field: string
  direction: SortDirection
}

export enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface ClueJSON {
  text: string
  id: string
}

export interface AnswerJSON {
  text: string
  id: string
}

export interface ClueAnswerPairJSON {
  clueId: string
  answerId: string
  puzzleId: string
  position: string
}
