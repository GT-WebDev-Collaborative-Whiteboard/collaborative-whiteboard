import express from 'express';
import 'dotenv/config';

const app = express();

app.get("/", (req, res) => {
  res.send("testing");
});

async function start() {
  const port = process.env.PORT;
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();