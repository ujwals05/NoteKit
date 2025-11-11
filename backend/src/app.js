import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

import authRoute from "./routes/auth.route.js";
import noteRoute from "./routes/notes.route.js";

app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);
export default app;
