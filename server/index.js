import express from 'express';
import 'dotenv/config';
import connectDB from './database/connect.js';
import bodyParser from 'body-parser';
import { createUser } from './database/actions/userActions.js';
import whiteboardRoutes from './routes/whiteboardRoutes.js'; // Make sure the path is correct based on your project structure

const app = express();

app.use(bodyParser.json());

// Root server route
app.get("/", (req, res) => {
  return res.send("Server is running...");
});

// User Registration 
app.post("/registerUser", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Whiteboard Routes
app.use('/whiteboards', whiteboardRoutes);

async function start() {
  const port = process.env.PORT || 3000;
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
