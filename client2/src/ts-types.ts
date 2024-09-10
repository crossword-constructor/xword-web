import { Cell } from './Common/GridPreview';

export interface Puzzle {
  board: Array<Cell>;
  width: number;
  clues: Array<Record<string, any>>;
}

export interface UserPuzzle {
  board: Array<Cell>;
}

export interface PlayablePuzzle {}

export interface ClueAnswerPair {
  cells: [number, number][];
  answer: {
    text: string;
  };
  clue: {
    text: string;
  };
  position: string;
}
