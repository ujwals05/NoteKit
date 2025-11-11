import { Router } from "express";
import {
  signin,
  signup,
  logout,
  currentUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRoute = Router();

authRoute.route("/signup").post(signup);
authRoute.route("/signin").post(signin);
authRoute.route("/logout").post(verifyJWT, logout);
authRoute.route("/currentUser").get(verifyJWT, currentUser);

export default authRoute;
