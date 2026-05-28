import exp from "express";
import { signup, login, logout, me } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = exp.Router();

//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//logout
router.post("/logout", verifyToken, logout);
//check user info
router.get("/me", verifyToken, me);

export default router;
