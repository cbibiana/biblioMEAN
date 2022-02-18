import express from "express";
import bookControllers from "../controllers/bookControllers.js";
import bookValidate from "../middleware/bookValidate.js";

const router = express.Router();

router.post("/registerBook", bookControllers.registerBook);
router.get("/listBook/:name?", bookControllers.listBook);

export default router;