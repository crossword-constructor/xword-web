import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true, index: true },
  clues: [
    {
      clue: { type: ObjectId, red: 'Clue' },
      count: { type: Number },
      _id: false,
    },
  ],
  puzzles: [{ type: ObjectId, ref: 'Puzzle' }],
});

export default mongoose.model('Answer', AnswerSchema);
