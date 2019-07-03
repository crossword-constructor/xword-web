import mongoose from 'mongoose';
import User from './user';
const { ObjectId, Mixed } = mongoose.Schema.Types;
const UserPuzzleSchema = new mongoose.Schema(
  {
    puzzle: { type: ObjectId, ref: 'Puzzle' },
    board: [[{ type: String }]],
    user: { type: ObjectId, ref: 'User' },
    time: { type: Number, default: 0 },
    revealedCells: [{ type: Array }],
    puzzleRevealed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserPuzzleSchema.pre('save', async function(doc) {
  if (this.isNew) {
    await User.findByIdAndUpdate(this.user, {
      $addToSet: { solvedPuzzles: this._id },
    });
  }
});

export default mongoose.model('UserPuzzle', UserPuzzleSchema);
