import mongoose, { connect } from "mongoose";
import connectDB from "../connect.js";
import 'dotenv/config';
import { Schema } from "mongoose";

// Normally, this schema and model definition should be in a separate file (<Model name>.js) and the model would be the only thing exported (export default sampleModel)
const sampleSchema = new Schema({
  user: String,
  password: String,
  whiteboards: [ String ]
})

const sampleModel = mongoose.model('Sample', sampleSchema);

// sample function to connect with mongo and modify the database
async function addData() {
  await connectDB(process.env.MONGO_URI);
  const sampleData = {
    user: "sample user",
    password: "hashed password",
    whiteboards: [
      "id1",
      "id2",
    ]
  }

  const sampleDocument = new sampleModel({
    ...sampleData
  });

  await sampleDocument.save();
}

export { sampleModel, addData };