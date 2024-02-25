import { Router } from 'express';
import * as africaController from '../controllers/africa.controller';
import * as authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// ADMIN
router.post('/create/', authMiddleware.authenticateAccessToken, authMiddleware.authorizeAdmin ,africaController.createAfrica);
router.post('/:id', authMiddleware.authenticateAccessToken, authMiddleware.authorizeAdmin, africaController.updateAfricaById);
router.delete('/:id', authMiddleware.authenticateAccessToken, authMiddleware.authorizeAdmin, africaController.deleteAfricaById);

// Lire un article et gestion des commentaires un commentaire
router.get('/:id', africaController.getAfricaById);
router.post('/:id/comment', authMiddleware.authenticateAccessToken, africaController.createComment);
router.delete('/:id/comment/:commentId', authMiddleware.authenticateAccessToken, africaController.deleteComment);
router.get('/:id/comment/:commentId', africaController.getCommentById);
router.put('/:id/comment/:commentId', authMiddleware.authenticateAccessToken, africaController.updateCommentById);
// Observer les articles
router.get('/', africaController.getAllAfrica);


// router.get('/:id', taskController.getTask);
export default router;
