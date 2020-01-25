import path from "path";
import bunyan from "bunyan";
import {NODE_LOGGING_LEVEL} from "./config";

// error log file "logError.json"
const log = bunyan.createLogger({
  name: "log",
  level: NODE_LOGGING_LEVEL,
  stream: process.stdout,
  path: path.resolve(__dirname, "..", "logError.json")
});

const isPrivate = (str: any) => {
  return (
    /.*password.*/.test(str) ||
    /.*street.*/.test(str) ||
    /.*email.*/.test(str) ||
    /.*zip.*/.test(str) ||
    /.*city.*/.test(str)
  );
};

const walk = (obj: any) => {
  const tmp = Object.assign({}, obj);
  const keys = Object.keys(tmp);

  keys.forEach(key => {
    const val = tmp[key];

    if (typeof val === "object") {
      tmp[key] = walk(val);
    }

    if (isPrivate(key)) {
      tmp[key] = "*****";
    }
  });

  return tmp;
};

export class Mask {
  constructor(private log: any) {
    this.log = log;
  }
  error(...args: [string, {path: string; object: string}]): any {
    const maskedArgs = walk(args);
    return this.log.error(maskedArgs);
  }
  info(...args: [string]): any {
    const maskedArgs = walk(args);
    return this.log.info(maskedArgs);
  }
}

export default new Mask(log);
