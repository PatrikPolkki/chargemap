"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const currentTypeSchema = new Schema({
  description: String,
  title: String,
});

export default mongoose.model("CurrentType", currentTypeSchema);
