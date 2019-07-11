import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
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

export const Puzzle = mongoose.connection
  .useDb(
    process.env.NODE_ENV === 'production'
      ? 'historicalPuzzles'
      : 'historicalCrossword'
  )
  .model('Puzzle', PuzzleSchema);

export const ccPuzzle = mongoose.connection.model('ccPuzzle', PuzzleSchema);
