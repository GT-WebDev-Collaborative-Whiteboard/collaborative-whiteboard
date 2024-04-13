import express from 'express';
import Whiteboard from '../models/whiteboard.js';

const router = express.Router();

// users who can edit a specific whiteboard (permissions + getting)
router.get('/:whiteboardId/users', async (req, res) => {
  try {
    const { whiteboardId } = req.params;
    const whiteboard = await Whiteboard.findById(whiteboardId).populate('owners');
    res.json(whiteboard.owners);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export default router;
