import { Router } from 'express';
import * as africaController from '../controllers/africa.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/create/',africaController.createAfrica);
router.post('/:id', africaController.updateAfricaById);
router.get('/', africaController.getAllAfrica);
router.get('/:id', africaController.getAfricaById);
router.delete('/:id', africaController.deleteAfricaById);

// router.get('/:id', taskController.getTask);
export default router;
