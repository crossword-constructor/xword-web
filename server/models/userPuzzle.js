import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const UserPuzzle = new mongoose.Schema({
  puzzle: { type: ObjectId, ref: 'puzzle' },
  board: [[{ type: String }]],
  user: { type: ObjectId, ref: 'user' },
});

export default mongoose.model('UserPuzzle', UserPuzzle);
