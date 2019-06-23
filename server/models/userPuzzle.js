import mongoose from 'mongoose';
import User from './user';
const ObjectId = mongoose.Schema.Types.ObjectId;
const UserPuzzle = new mongoose.Schema({
  puzzle: { type: ObjectId, ref: 'puzzle' },
  board: [[{ type: String }]],
  user: { type: ObjectId, ref: 'user' },
});

UserPuzzle.pre('save', async function(doc) {
  console.log('new: ', this.isNew);
  console.log(doc._id);
  console.log(this._id);
  if (this.isNew) {
    await User.findByIdAndUpdate(this.user, {
      $addToSet: { solvedPuzzles: this._id },
    });
  }
});

export default mongoose.model('UserPuzzle', UserPuzzle);
