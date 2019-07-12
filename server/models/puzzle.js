import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import { PUZZLE_DB_NAME } from '../config';

const PuzzleSchema = new mongoose.Schema(
  {
    editor: { type: String },
    title: { type: String },
    author: { type: String },
    publisher: { type: String },
    clues: [
      {
        position: { type: String },
        answer: { type: ObjectId, ref: 'Answer' },
        clue: { type: ObjectId, ref: 'Clue' },
      },
    ],
    date: { type: String },
    dimensions: {
      rows: { type: Number },
      columns: { type: Number },
    },
    board: [],
    privacySetting: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE', 'SUPERPRIVATE'],
    },
  },
  { timestamps: true }
);

const newConnection = mongoose.connection.useDb(PUZZLE_DB_NAME);
export const Puzzle = newConnection.model('Puzzle', PuzzleSchema);

export const ccPuzzle = mongoose.connection.model('ccPuzzle', PuzzleSchema);
