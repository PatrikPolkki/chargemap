"use strict";
import mongoose from "mongoose";
import connectionTypes from "./connectionTypes";

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ConnectionTypeId: {
    type: Schema.Types.ObjectId,
    ref: connectionTypes,
  },
});

export default mongoose.model("connections", connectionSchema);
