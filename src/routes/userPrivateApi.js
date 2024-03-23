import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import permisionPage from "../controllers/permision-controller.js";
import listGarapAidropController from "../controllers/list-garap-aidrop-controller.js";
import userContoller from "../controllers/user-contoller.js";
import listAidropController from "../controllers/list-aidrop-controller.js";

const router = express.Router();
router.use(authMiddleware.userJwtValidate);
router.post("/api/user/permision", permisionPage);
router.post("/api/user/update/password", userContoller.updatePass);
router.post("/api/user/", userContoller.get);

router.post("/api/garap/create", listGarapAidropController.create);
router.post("/api/garap/", listGarapAidropController.get);
router.post("/api/garap/delete", listGarapAidropController.deletes);
router.post("/api/list-aidrop/search", listAidropController.search);
export default router;
