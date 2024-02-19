import { Request, Response } from 'express';
import { Africa, AfricaCreation } from '../types/africa';
import { User } from '../types/user';
import * as AfricaService from '../services/africa.service';
import { stringDecode } from '../utils/string.utils';

export const createAfrica = async (req: Request, res: Response) => {
  const africa : AfricaCreation = req.body;
  const email : User = req.body.email;
  try {
    const newAfrica = await AfricaService.createAfrica(africa, email);
    res.status(201).send(newAfrica);
  } catch (error) {
    res.status(500).send('Error creating blog Africa : You are not allowed to create a new article');
  }

};

export const getAllAfrica = async (req: Request, res: Response) => {
  const category = req.query.category || "";
  const title = req.query.title || "";
  const author = req.query.author || "";

  const filters: { [key: string]: any } = {};

  if (category !== "") {
    filters.category = category;
  }

  if (title !== "") {
    filters.title = title;
  }
  if (author !== "") {
    filters.author = author;
  }
  try {
    let allAfrica: any;
    if (Object.keys(filters).length === 0) {
      // Si aucun filtre n'est fourni, récupérer tous les articles
      allAfrica = await AfricaService.getAllAfrica();
    } else {
      // Sinon, appliquer les filtres spécifiés
      allAfrica = await AfricaService.getAllAfrica(filters);
    }
    res.status(200).send(allAfrica);
  
  } catch (error) {
    res.status(500).send('Error getting all blog Africa');
  }
};



export const getAfricaById = async (req: Request, res: Response) => {
  const articleId = req.params.id;
 
  try {
    const { article, articlesWithSameCategory } = await AfricaService.getAfricaById(articleId);
    
    if (article) {
      res.status(200).json({ article, articlesWithSameCategory });
    } else {
        res.status(404).send('Article not found');
    }
  } catch (error) {
    res.status(500).send('Error getting blog Africa by id : Controller');
  }
}


export const deleteAfricaById = async (req: Request, res: Response) => {
  const email = req.body.email;
  const articleId = req.params.id;
  
  try {
      const deletedAfrica = await AfricaService.deleteAfricaById(articleId, email);
      
      // Vérifier si l'article a été trouvé et supprimé avec succès
      if (!deletedAfrica) {
          // Si l'article n'est pas trouvé, renvoyer "article not found"
          return res.status(404).send('Article not found');
      }
      
      // Si l'article est trouvé et supprimé avec succès, envoyer une réponse appropriée
      return res.status(200).send(deletedAfrica);
  } catch (error) {
      // Gestion des erreurs
      return res.status(500).send('You are not authorized to delete an article');
  }
};


export const updateAfricaById = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const updatedAfrica = await AfricaService.updateAfricaById(req.params.id, req.body, email);
    res.status(200).send(updatedAfrica);
  } catch (error) {
    res.status(500).send('Error updating blog Africa : ');
  }
}

