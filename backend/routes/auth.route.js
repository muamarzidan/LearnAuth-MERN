import express from "express";

import {
	login,
	logout,
	signup,
	signupAdmin,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";


const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post('/signup-admin', signupAdmin);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get('/user-management', verifyToken, checkRole(['admin']), (req, res) => {
	res.status(200).json({ success: true, message: 'Welcome Admin!' });
});

export default router;