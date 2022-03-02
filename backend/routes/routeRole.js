import express from "express";
import roleControllers from "../controllers/roleControllers.js";
import roleMidd from "../middleware/roleValidate.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validId from "../middleware/validId.js";

const router = express.Router();

router.post("/registerRole", auth, admin, roleMidd.existingRole, roleControllers.registerRole);

router.get("/listRole/:name?", auth, admin, roleControllers.listRole);
router.get("/find/:_id", auth, admin, roleMidd.doNotChanges, roleControllers.updateRole)
router.put("/updateRole", auth, admin, roleMidd.doNotChanges, roleControllers.updateRole);
router.put("/delete/:_id", auth, admin, validId, roleControllers.deleteRole);


export default router;
