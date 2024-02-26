import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const authUser = mongoose.model("AuthUser", authUserSchema);

export default authUser;