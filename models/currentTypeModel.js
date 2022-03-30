"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currentTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: String,
  title: String,
});

export default mongoose.model("CurrentType", currentTypeSchema);
