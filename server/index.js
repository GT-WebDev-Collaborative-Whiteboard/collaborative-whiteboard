// index.js
import express from 'express';
import 'dotenv/config';
import connectDB from './database/connect.js';
import bodyParser from 'body-parser';
import { createUser } from './database/actions/userActions.js';

const app = express();

app.use(bodyParser.json());

// Routing
app.get("/", (req, res) => {
  return res.send("Server is running...");
});

// Register Route
app.post("/registerUser", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function start() {
  const port = process.env.PORT || 3000;
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();