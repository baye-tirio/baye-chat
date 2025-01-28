import {Router} from 'express'
import { verifyToken } from '../utils/verifyToken.mjs';
import { deleteMessage, editMessage, getChat, sendMessage ,getPlatformUsers } from '../controllers/message.controllers.mjs';
const router = Router();
router.get('/get-users',verifyToken,getPlatformUsers);
router.get('/get-chat/:receiver_id',verifyToken,getChat);
router.post('/send-message',verifyToken,sendMessage);
router.post('/edit-message/:id',verifyToken,editMessage);
router.delete('/delete-message/:id',verifyToken,deleteMessage);
export default router;