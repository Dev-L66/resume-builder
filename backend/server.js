import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDb } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({}));
app.use(express.json());

//db
connectToDb();

//routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/uploads', express.static(path.join(__dirname,'uploads'),{
  setHeaders:(res, _path)=>{
    res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  }
}));

//server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
