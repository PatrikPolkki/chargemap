"use strict";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import stationRoute from "./routes/stationRoute";
import authRoute from "./routes/authRoute.js";
import passport from "./utils/pass.js";
import db from "./utils/db";

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/station", stationRoute);

app.use("/", (req, res) => {
  res.send("HELLO chargemap");
});

db.on("connected", () => {
  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  });
});
