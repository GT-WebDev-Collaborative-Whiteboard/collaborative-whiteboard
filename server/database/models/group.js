import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
