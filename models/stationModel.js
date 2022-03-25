"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

stationSchema.query.byGender = function (gender) {
  return this.find(gender ? { gender } : {});
};

stationSchema.query.olderThan = function (age) {
  return this.find(
    age
      ? {
          birthdate: {
            $gte: new Date(
              new Date().setFullYear(new Date().getFullYear() - age)
            ),
          },
        }
      : {}
  );
};

stationSchema.query.heavierThan = function (weight) {
  return this.find(weight ? { weight: { $gte: weight } } : {});
};

export default mongoose.model("station", stationSchema);
