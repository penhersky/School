import dotenv from "dotenv";
import PATH from "path";
import {LogLevelString} from "bunyan";

const root: Function = PATH.join.bind(this, __dirname, "../");
dotenv.config({path: root(".env")});

export const isProduction: boolean = process.env.NODE_ENV === "production";
export const isDevelopment: boolean = !isProduction;
export const port: number | undefined = Number(process.env.port);
export const url: string = String(process.env.URL_DB);
export const NODE_LOGGING_LEVEL: LogLevelString = <LogLevelString>(
  process.env.NODE_LOGGING_LEVEL
);
