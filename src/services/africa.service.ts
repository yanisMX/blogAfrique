import { AfricaCreation } from "../types/africa";
import { User } from "../types/user";
import * as AfricaRepo from "../repositories/africa.repository";
import * as userService from './user.service';

export const createAfrica = async (africa: AfricaCreation) => {
  try {
    const createdAfrica = await AfricaRepo.createAfrica(africa);
    return createdAfrica;
  } catch (error) {
    console.error('Could not create Africa : Service Error', error);
    throw new Error('Impossible de créer l\'Africa : Erreur du Service');
}
};

// africa.service.js

// Fonction pour récupérer tous les articles
export const getAllAfrica = async (filter: any = {}) => {
    try {
        if (Object.keys(filter).length === 0) {
            const allAfrica = await AfricaRepo.getAllAfrica();
            return allAfrica;
        }
        // Appel de la fonction du repository pour récupérer tous les articles
        const allAfrica = await AfricaRepo.getAllAfrica(filter);
        return allAfrica;
    } catch (error) {
        console.error('Could not get all Africa articles : Service Error', error);
        throw new Error('Impossible de récupérer tous les articles Africa : Erreur du Service');
    }
};


export const getAfricaById = async (id: string) => {
    try {
      // Récupérer l'article par son ID
      const article = await AfricaRepo.getAfricaById(id);
      
      if (!article) {
          throw new Error('Article not found');
      }

      // Récupérer d'autres articles avec la même catégorie que l'article récupéré
      const articlesWithSameCategory = await AfricaRepo.getAllAfrica({ category: article.category });
      
      if (!articlesWithSameCategory) {
          throw new Error('Articles with same category not found');
      }
      const articleTitles = articlesWithSameCategory.map((article: any) => article.title);
      const articleTitlesWithoutCurrentArticle = articleTitles.filter((title: any) => title !== article.title);
      
      return { article, articlesWithSameCategory: articleTitlesWithoutCurrentArticle};
  
    } catch(error) {
      console.error('Could not get article by id or other articles with same category : Service Error', error);
      throw new Error('Impossible de récupérer l\'article par id ou les autres articles avec la même catégorie : Erreur du Service');
    }
  }
  

export const deleteAfricaById = async (id : any) => {
    try{
        const deletedAfrica = await AfricaRepo.deleteAfricaById(id)
        return deletedAfrica;
    } catch(error){
        console.error('Could not delete Africa by id : Service Error', error);
        throw new Error('Impossible de supprimer l\'article Africa par id : Erreur du Service');
    }
}

export const updateAfricaById = async (id : any, africa : any) => {
    try{
        const updatedAfrica = await AfricaRepo.updateAfricaById(id, africa)
        return updatedAfrica;
    } catch(error){
        console.error('Could not update Africa by id : Service Error', error);
        throw new Error('Impossible de mettre à jour l\'article Africa par id : Erreur du Service');
    }
}

