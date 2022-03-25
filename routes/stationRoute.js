"use strict";
// stationRoute
import { Router } from "express";
import passport from "../utils/pass";
import {
  station_list_get,
  station_get,
  station_post,
  station_put,
  station_delete,
} from "../controllers/stationController";

const router = Router();

router.get("/", station_list_get);

router.get("/:id", station_get);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  station_post
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  station_put
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  station_delete
);

export default router;
