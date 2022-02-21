import express from "express";
import bookControllers from "../controllers/bookControllers.js";
import bookValidate from "../middleware/bookValidate.js";

const router = express.Router();

router.post("/registerBook", bookControllers.registerBook);
router.get("/listBook/:name?", bookControllers.listBook);
router.put("/delete/:_id", bookControllers.deleteBook);
router.put("/updateBook", bookControllers.updateBook);

export default router;
