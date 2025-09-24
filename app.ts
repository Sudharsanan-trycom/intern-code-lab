import express, { Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/posts";
import {connectDB} from "./db/config"
import './jobs/cronJobs'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

connectDB()

app.get("/", (req: Request, res: Response) => {
  res.send("Server running successfully!");
});

app.use("/api/v1/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
