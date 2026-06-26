import express from 'express';
import cors from 'cors';
import notesRouter from "./routes/notesRouter.js";
import connectDB from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(express.json())
app.use(rateLimiter)
app.use("/api/notes", notesRouter);

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})