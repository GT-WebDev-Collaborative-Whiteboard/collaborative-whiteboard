import express from 'express';
import 'dotenv/config';
import connectDB from './database/connect.js';

const app = express();

app.get("/", (req, res) => {
  res.send("testing");
});

async function start() {
  const port = process.env.PORT;
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