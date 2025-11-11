import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/notes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const noteRoute = Router();

noteRoute.route("/").post(verifyJWT, createNote);
noteRoute.route("/").get(verifyJWT, getNotes);
noteRoute.route("/:id").get(verifyJWT, getNoteById);
noteRoute.route("/:id").put(verifyJWT, updateNote);
noteRoute.route("/:id").delete(verifyJWT, deleteNote);

export default noteRoute;
