"use strict";
import jwt from "jsonwebtoken";
import passport from "../utils/pass";

const login = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("authcontroller user:", user);
    if (err || !user) {
      return res.status(400).send("Error loggin in");
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send("Error logging in.");
      }
      const token = jwt.sign(user, "987456");
      return res.status(200).json({ message: token });
    });
  })(req, res);
};

export { login };
