import mongoose from 'mongoose';

const whiteboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: false
  },
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  group: {
    type: mongoose.Schema.Types.ObjectId, 
    required: false
  }
});

const Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);

export default Whiteboard;
