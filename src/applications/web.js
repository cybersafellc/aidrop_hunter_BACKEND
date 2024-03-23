import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from "../middlewares/error-middleware.js";
import publicApiRouter from "../routes/publicApi.js";
import privateUserRouter from "../routes/userPrivateApi.js";
import privateAdminRoute from "../routes/adminPrivateApi.js";

const web = express();
web.use(
  cors({
    origin: "https://aidrop-hunter.rpnanda.com", // DONT FORGET TO CHANGE 'THIS SETUP FE DOMAIN'
    credentials: true,
  })
);
web.use(bodyParser.json());
web.use(cookieParser());
web.use(publicApiRouter);
web.use("/82fc04fdbf", privateAdminRoute);
web.use("/private", privateUserRouter);
web.use(errorMiddleware.pageNotFound);
web.use(errorMiddleware.errorHandler);
export default web;
