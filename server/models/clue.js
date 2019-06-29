import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const ClueSchema = new mongoose.Schema({
  text: { type: String, index: true },
  answers: [
    {
      answer: { type: ObjectId, ref: 'Answer' },
      count: { type: Number },
      _id: false,
    },
  ],
  puzzles: [{ type: ObjectId, ref: 'Puzzle' }],
});

export default mongoose.model('Clue', ClueSchema);
