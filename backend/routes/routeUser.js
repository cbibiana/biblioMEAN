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

router.get("/listUser/:name?", userControllers.listUser);

export default router;
