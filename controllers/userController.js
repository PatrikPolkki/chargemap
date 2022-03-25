"use strict";
// catController
import { users } from "../models/userModel";

const user_get_list = (req, res) => {
  res.json(users);
};

const user_get = (req, res) => {
  const user = users.filter((user) => {
    return req.params.id === user.id;
  });
  res.send(user);
};

const user_post = (req, res) => {
  console.log(req.body);
  res.send(req.body);
};

export { user_get_list, user_get, user_post };
