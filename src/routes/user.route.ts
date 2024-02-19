import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/signup', userController.createUser);
router.get('/check', userController.getUserByEmail);
//router.post('/login', authController.login);
router.get('/users', userController.getAllUsers);

export default router;

