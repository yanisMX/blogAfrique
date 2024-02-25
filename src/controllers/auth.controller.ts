import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  try {
    const user = await authService.login(email, password);

    res.status(200).send('Connexion réussie ! \n' + JSON.stringify(user.accessToken));

  } catch (error) {
    console.error('Error object:', error);
    res.status(500).send(error.toString());
  }
}

export const logout = async (req: Request, res: Response) => {
  const { accessToken } = req.body;
  
  try {
    // Vérifier si le jeton d'accès correspond à celui de la session active
    const isValid = await authService.validateAccessToken(accessToken);
    if (!isValid) {
      return res.status(401).send('Invalid access token for logout');
    }

    // Si le jeton est valide, procéder à la déconnexion
    const user = await authService.logout(accessToken);
    return res.status(200).send('Déconnexion réussie ! \n' + JSON.stringify(user));
  } catch (error) {
    console.error('Error object:', error);
    res.status(500).send(error.toString());
  }
}

