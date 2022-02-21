import express from "express";
import userControllers from "../controllers/userControllers.js";
import userValidate from "../middleware/userValidate.js";
import roleValidate from "../middleware/roleValidate.js";

const router = express.Router();

router.post(
  "/registerUser",
  userValidate.existingUser,
  roleValidate.existingRole,
  userControllers.registerUser
);
router.post("/login", userControllers.login);
router.get("/listUser/:name?", userControllers.listUser);
router.get("/listUserAdmin/:name?", userControllers.listUserAdmin);
router.put("/delete/:_id", userControllers.deleteUser);

//router para cambiar datos, no lleva parametros :_id
router.put("/updateUserAdmin/", userControllers.updateUserAdmn)

export default router;
