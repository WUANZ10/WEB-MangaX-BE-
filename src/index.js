import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import { basicReponse } from "./middleware/basicReponse.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();


const PORT = process.env.PORT || 3001;

app.use(basicReponse);
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser())


routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect DB success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server đang chạy trên http://localhost:${PORT}`);
});
