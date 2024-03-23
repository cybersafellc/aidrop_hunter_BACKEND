import http from "http";
import web from "./applications/web.js";
import dotenv from "dotenv";
import logger from "./applications/logging.js";
dotenv.config();

const server = http.createServer(web);
server.listen(process.env.APP_PORT, logger.info("server running"));
