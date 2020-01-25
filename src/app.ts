import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from "./database";
import {port, url} from "./config";

const app = express();

app.use("*", cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

connectDB(url);

app.listen({port}, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
