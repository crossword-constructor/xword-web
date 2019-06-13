import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';
import user from '../resolvers/user';

const userSchema = new mongoose.Schema(
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
    solvedPuzzles: [],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

userSchema.methods.authSummary = function() {
  return {
    _id: this._id,
    isAdmin: this.isAdmin,
  };
};

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', userSchema);

export default User;
