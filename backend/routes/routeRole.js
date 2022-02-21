import express from "express";
import bookControllers from "../controllers/bookControllers.js";
import roleControllers from "../controllers/roleControllers.js";

const router = express.Router();
router.post("/registerRole", roleControllers.registerRole);

router.get("/listRole/:name?", roleControllers.listRole);

router.put("/delete/:_id", roleControllers.deleteRole);
router.put("/updateRole", roleControllers.updateRole);

export default router;
