"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const connectionTypesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Formalname: String,
  Title: String,
});

export default mongoose.model("connectionTypes", connectionTypesSchema);
