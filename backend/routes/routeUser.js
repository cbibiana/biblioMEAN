import express from "express";
import userControllers from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import userValidate from "../middleware/userValidate.js";
import roleValidate from "../middleware/roleValidate.js";
import validId from "../middleware/validId.js";

const router = express.Router();

router.post(
  "/registerUser",
  userValidate.existingUser,
  roleValidate.getRoleUser,
  userControllers.registerUser
);

router.post(
  "/registerAdminUser",
  userValidate.validRole,
  userValidate.existingUser,
  auth,
  admin,
  userControllers.registerUser
);

router.post("/login", userControllers.login);
router.get("/listUser/:name?", auth, admin, userControllers.listUser);
router.get("/listAllUser/:name?", auth, admin, userControllers.listAllUser);
router.get("/getRole/:email", auth, userControllers.getUserRole);
router.get("/findUser/:_id", auth, validId, admin, userControllers.findUser);
router.put(
  "/updateUser",
  auth,
  userValidate.validDataUpdate,
  userControllers.updateUser
);
router.put(
  "/updateUserAdmin/",
  auth,
  admin,
  userValidate.validDataUpdate,
  userValidate.validRole,
  userControllers.updateUser
);
router.put("/delete/:_id", auth, validId, userControllers.deleteUser);

export default router;
