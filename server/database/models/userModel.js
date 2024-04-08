import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  whiteboards: [{
    type: String,
  }],
});

const User = mongoose.model('User', userSchema);

export default User;
