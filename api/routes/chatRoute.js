import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {
    
    addChat,
    getChat,
    getChats,
    readChat
} from "../controllers/chatController.js";


// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.post("/read/:id", verifyToken, readChat);

export default router;