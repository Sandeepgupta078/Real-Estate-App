import express from 'express';
import { shouldBeAdmin, shouldBeLoggedIn } from '../controllers/testController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.get('/should-be-logged-in',verifyToken, shouldBeLoggedIn) // This route is protected and only accessible to logged in users

router.get('/should-be-admin',verifyToken, shouldBeAdmin) // This route is protected and only accessible to admin

export default router;