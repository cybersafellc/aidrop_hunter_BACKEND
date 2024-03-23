import express from "express";
import userContoller from "../controllers/user-contoller.js";
import listAidropController from "../controllers/list-aidrop-controller.js";
import adsController from "../controllers/ads-controller.js";

const router = express.Router();
router.post("/api/user/create", userContoller.create);
router.post("/api/user/login", userContoller.login);
router.post("/api/list-aidrop/", listAidropController.get);
router.post("/api/ads", adsController.get);
export default router;
