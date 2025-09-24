import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info", 
  format: combine(
    colorize(),     
    timestamp(),    
    myFormat        
  ),
  transports: [
    new transports.Console(),               
    new transports.File({ filename: "logs/error.log", level: "error" }), // errors to file
    new transports.File({ filename: "logs/combined.log" })                // all logs to file
  ],
});

export default logger;
