import express from 'express';
import 'dotenv/config';
import connectDB from './database/connect.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("testing");
});

//Create the Mongo Model for the user.
//Create functions to handle the User model (e.g. createUser, deleteUser, updateUser(new user data))


// app.get("/", (req, res) => {
//   const sampleData = {
//     username: "username",
//     data: "whatever",
//   };

//   connectDB(url);

//   const newDBEntry = new userModel({sampleData});
//   newDBEntry.save();
//   res.send("testing");
// });

// function getWhiteboardsFromUser(user) {
//   connectDB(process.env.MONGO_URI);

//   userModel.find({user})
// }

// /*
//   {
//     user: username,
//     password: password,
//     whiteboards: [whiteboard names]
//   }
// */
// app.post("/registerUser", (req, res) => {
//   req.body;
//   req.query;
//   res.status();
//   res.send();
// });

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