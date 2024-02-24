import { Request, Response, NextFunction } from 'express';
import * as jwtUtils from '../utils/jwt.utils';
import { JwtPayload } from 'jsonwebtoken';


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