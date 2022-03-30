"use strict";
import mongoose from "mongoose";
import connectionTypes from "./connectionTypes";
import currentTypes from "./currentTypeModel";
import level from "./levelModel";

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  quantity: Number,
  ConnectionTypeID: { type: Schema.Types.ObjectId, ref: connectionTypes },
  CurrentTypeID: { type: Schema.Types.ObjectId, ref: currentTypes },
  LevelID: { type: Schema.Types.ObjectId, ref: level },
});

export default mongoose.model("connections", connectionSchema);
