import { Router } from 'express';
import * as africaController from '../controllers/africa.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// ADMIN
router.post('/create/', authMiddleware.authenticateAccessToken, authMiddleware.authorizeAdmin ,africaController.createAfrica);
router.post('/:id', authMiddleware.authenticateAccessToken, authMiddleware.authorizeAdmin, africaController.updateAfricaById);
router.delete('/:id', authMiddleware.authenticateAccessToken, authMiddleware.authorizeAdmin, africaController.deleteAfricaById);

router.get('/', africaController.getAllAfrica);
router.get('/:id', africaController.getAfricaById);

// router.get('/:id', taskController.getTask);
export default router;
