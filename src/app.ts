import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {NotFoundError, ServerError} from "./middleware";

import {Student, Groups, Auditory, Teacher, Lessons} from "./routes";

import connectDB from "./database";
import {port, url} from "./config";

const app = express();

app.use("*", cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/student", Student);
app.use("/group", Groups);
app.use("/auditory", Auditory);
app.use("/teacher", Teacher);
app.use("/lessons", Lessons);

connectDB(url);

app.use(NotFoundError);
app.use(ServerError);

app.listen({port}, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
