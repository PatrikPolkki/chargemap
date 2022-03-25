"use strict";
// catRoute
import { Router } from "express";

const router = Router();
import {
  user_get_list,
  user_get,
  user_post,
} from "../controllers/userController";

router.get("/", user_get_list);

router.get("/:id", user_get);

router.post("/", user_post);

export default router;
