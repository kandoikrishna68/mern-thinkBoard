import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import notesRouter from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
// Middleware to parse JSON bodies from incoming requests
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
