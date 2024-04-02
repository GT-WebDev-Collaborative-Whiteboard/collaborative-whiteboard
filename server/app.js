import express from 'express';
import 'dotenv/config';
import connectDB from './database/connect.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

// User Model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // Uses hash passwords ??
    type: String,
    required: true,
  },
  whiteboards: [{
    type: String,
  }],
});

const User = mongoose.model('User', userSchema);

// createUser Function
async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// deleteUser Function
async function deleteUser(userId) {
  try {
    const result = await User.deleteOne({ _id: userId });
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// updateUser Function
async function updateUser(userId, newUserData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

//Routing
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
