import mongoose from "mongoose";
import authUser from "../models/auth-user.js";
import connectDB from "../connect.js";

async function registerUser(username, password, uri) {
  await connectDB(uri);
  if (await authUser.exists({username})) {
    return false;
  }
  const newUser = new authUser({username, password});
  await newUser.save();
  return true;
}

async function authenticateUser(username, password, uri) {
  await connectDB(uri);
  if (await authUser.exists({username, password})) {
    return true;
  } else {
    return false;
  }
}

export {registerUser, authenticateUser};