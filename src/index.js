import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());

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
