import mongoose from "mongoose";

const authorizationCodeSchema = new mongoose.Schema({
  code: String,
  expiry: Date, // date not hooked into mongoose change tracking logic, so use markModified to track
  exchanged: Boolean, // whether authorization code was already exchanged, if tried to exchange again, assume attack
})