import express from "express";
import bookControllers from "../controllers/bookControllers.js";
import auth from "../middleware/auth.js";
import validId from "../middleware/validId.js";


const router = express.Router();

router.post("/saveBook", auth, bookControllers.saveBook);
router.get("/listBook", auth, bookControllers.listBook);
router.put("/delete/:_id", auth,validId, bookControllers.deleteBook);
router.put("/updateBook", auth, bookControllers.updateBook);

export default router;
