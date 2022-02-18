import express from "express";
import roleControllers from "../controllers/roleControllers.js";

const router = express.Router();
router.post("/registerRole", roleControllers.registerRole);

router.get("/listRole/:name?", roleControllers.listRole);

export default router;
