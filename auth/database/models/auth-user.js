import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const authUserModel = new mongoose.Model(authUserSchema);

export default authUserModel;