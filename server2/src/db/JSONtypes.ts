export interface PuzzleJSON {
  id: string
  name: string
  board: CellJSON[]
  width: number
  height: number
  date: string
}

export interface UserPuzzleJSON {
  id: string
  puzzleId: string
  board: UserCellJSON[]
}

export interface CellJSON {
  text: string
  style: string
}

interface UserCellJSON {
  text: string
  style: string
  guess: string
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
  clueText?: string
  answerText?: string
}

export interface UserJSON {
  id: string
  firstName: string
  lastName: string
  username: string
  hashedPassword: string
  role: UserRole
}

enum UserRole {
  ADMIN = 'ADMIN',
  BASE = 'BASE',
}
