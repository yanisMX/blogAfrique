import { Request, Response, NextFunction } from 'express';
import * as jwtUtils from '../utils/jwt.utils';
import { User } from '../types/user';

export const authenticateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    // Extraire le token d'accès du header de la requête
    const accessToken = req.headers.authorization?.split(' ')[1];
    
    // Vérifier si le token est présent
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    try {
        // Vérifier et extraire les informations de l'utilisateur à partir du token d'accès
        const userData = await jwtUtils.decodeAccessToken(accessToken);
        req.user = userData; // Ajouter les informations de l'utilisateur à l'objet de requête pour une utilisation ultérieure
        next(); // Continuer vers la prochaine étape
    } catch (error) {
        return res.status(401).json({ message: 'Invalid access token' });
    }
};

// Middleware d'autorisation pour vérifier le rôle de l'utilisateur
export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // Extraire les informations de l'utilisateur de l'objet de requête
    const user = req.user;

    // Vérifier si l'utilisateur est un administrateur
    if (user !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }

    // Si l'utilisateur est un administrateur, continuer vers la prochaine étape
    next();
};