import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  client_id: String,
  client_secret: String,
  redirect_uri: String,
});