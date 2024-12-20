import express from 'express';
import { 
    deleteUser, 
    getNotificationNumber, 
    // getUserById, 
    getUsers, 
    profilePosts, 
    savePost, 
    updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';


const router = express.Router();

router.get('/', getUsers);
// router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/save', verifyToken, savePost);
router.get('/profilePosts', verifyToken, profilePosts);
router.get('/notification', verifyToken, getNotificationNumber);

export default router;