import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info",
  handleExceptions: true,
  handleRejections: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({}),
    new winston.transports.DailyRotateFile({
      filename: "ALL-%DATE%.log",
      zippedArchive: true,
      maxSize: "500m",
      maxFiles: "15d",
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "ERROR-%DATE%.log",
      zippedArchive: true,
      maxSize: "500m",
      maxFiles: "15d",
    }),
  ],
});

export default logger;
