import express from 'express';
import Whiteboard from '../models/whiteboard.js'; 

const router = express.Router();

// Create whiteboard
router.post('/', async (req, res) => {
  try {
    const newWhiteboard = new Whiteboard(req.body);
    await newWhiteboard.save();
    res.status(201).send(newWhiteboard);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

// Get whiteboard
router.get('/:whiteboardId', async (req, res) => {
  try {
    const whiteboard = await Whiteboard.findById(req.params.whiteboardId);
    if (!whiteboard) {
      return res.status(404).send("Whiteboard not found.");
    }
    res.json(whiteboard);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Update whiteboard
router.put('/:whiteboardId', async (req, res) => {
  try {
    const updatedWhiteboard = await Whiteboard.findByIdAndUpdate(req.params.whiteboardId, req.body, { new: true });
    if (!updatedWhiteboard) {
      return res.status(404).send("Whiteboard not found.");
    }
    res.json(updatedWhiteboard);
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

// Delete whiteboard
router.delete('/:whiteboardId', async (req, res) => {
  try {
    const deletedWhiteboard = await Whiteboard.findByIdAndDelete(req.params.whiteboardId);
    if (!deletedWhiteboard) {
      return res.status(404).send("Whiteboard not found.");
    }
    res.send("Whiteboard deleted successfully.");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export default router;
