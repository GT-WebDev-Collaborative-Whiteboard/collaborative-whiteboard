import express from 'express';
import User from '../models/user.js';
import Whiteboard from '../models/whiteboard.js';

const router = express.Router();

// wb for specific users (getting)
router.get('/:userId/whiteboards', async (req, res) => {
  try {
    const { userId } = req.params;
    const userWhiteboards = await User.findById(userId).populate('whiteboards');
    res.json(userWhiteboards.whiteboards);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export default router;
