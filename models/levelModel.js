"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const levelSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  comments: String,
  isFastChargeCapable: Boolean,
});

export default mongoose.model("Level", levelSchema);
