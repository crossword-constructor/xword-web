import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken.`, // TODO: security
      },
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: ({ value }) => `Username ${value} has already been taken.`, // TODO: security
      },
    },
    name: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    constructedPuzzles: [],
    solvedPuzzles: [{ type: ObjectId, ref: 'UserPuzzle' }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

UserSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

UserSchema.methods.authSummary = function() {
  return {
    _id: this._id,
    isAdmin: this.isAdmin,
  };
};

// Ensure virtual fields are serialised.
// UserSchema.set('toJSON', {
//   virtuals: true,
// });

const User = mongoose.model('User', UserSchema);
export default User;
