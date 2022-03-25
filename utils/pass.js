"use strict";
import passport from "passport";
import Strategy from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { getUserLogin } from "../models/userModel";

passport.use(
  new Strategy({}, (username, password, done) => {
    const user = getUserLogin(username);
    // if user is undefined
    if (!user) return done(null, false);
    // if passwords dont match
    if (user.password !== password) return done(null, false);
    // if all is ok
    delete user.password;
    return done(null, user);
  })
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "987456",
    },
    (payload, done) => {
      console.log("jwt payload", payload);
      done(null, payload);
    }
  )
);

export default passport;
