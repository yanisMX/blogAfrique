import { Request, Response, NextFunction } from 'express';
import * as jwtUtils from '../utils/jwt.utils';
import { JwtPayload } from 'jsonwebtoken';
import * as AfricaRepo from '../repositories/africa.repository';
import * as userService from '../services/user.service';


export const authenticateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    // Extraire le token d'accès du header de la requête
    const accessToken = req.headers.authorization;
    
    // Vérifier si le token est présent
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    try {
        // Vérifier et extraire les informations de l'utilisateur à partir du token d'accès
        const userData = jwtUtils.decodeAccessToken(accessToken);
        console.log(userData)
        next(); // Continuer vers la prochaine étape
    } catch (error) {
        return res.status(401).json({ message: 'Invalid access token : authenticate ' });
    }
};



export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // Extraire le token d'accès du header de la requête
    const accessToken = req.headers.authorization;
    
    // Vérifier si le token est présent
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    try {
        // Vérifier et extraire les informations de l'utilisateur à partir du token d'accès
        const userData = await jwtUtils.decodeAccessToken(accessToken);

        // Vérifier si userData est bien de type JwtPayload
        if (typeof userData !== 'object' || !('role' in userData)) {
            throw new Error('Invalid token payload');
        }

        // Récupérer le rôle de l'utilisateur
        const role = (userData as JwtPayload).role;

        // Vérifier si l'utilisateur est un administrateur
        if (role == 'admin') {
            // Si l'utilisateur est un administrateur, autoriser l'accès
            next();
        } else {
            // Si l'utilisateur n'est pas un administrateur, refuser l'accès
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid access token : authorizeAdmin' });
    }
};


export const actionComment = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    const commentId = req.params.commentId;
    const articleId = req.params.id;

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is required' });
    }
    if (!commentId) {
        return res.status(400).json({ message: 'Comment ID is required' });
    }
    if (!articleId) {
        return res.status(400).json({ message: 'Article ID is required' });
    }
    
    try {
        // Décoder le token pour obtenir les informations de l'utilisateur
        const userData = await jwtUtils.decodeAccessToken(accessToken);
        
        // Récupérer l'ID de l'utilisateur par son email
        const user = await userService.getUserByEmail(userData.email);
        const userId = user.userId;
        // Récupérer le commentaire
        const comment = await AfricaRepo.getCommentById(articleId, commentId);
        
        // Vérifier si le commentaire existe
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        console.log(comment.userId.toString(), userId.toString())
        // Vérifier si l'utilisateur est autorisé à supprimer le commentaire
        if (userId.toString() !== comment.userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to remove this comment' });
        }

        // Si tout est correct, passer à l'étape suivante
        next();
    } catch (error) {
        console.error('Error in actionComment middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

