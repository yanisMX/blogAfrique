import { Africa, AfricaCreation } from "../types/africa";
import { AfricaModel } from "../databases/models/africa.models";
import { query } from "express";

export const createAfrica = async (africa : AfricaCreation) => {
    try {
        const createdAfrica = await AfricaModel.create(africa);
        return createdAfrica;
    } catch(error) {
        console.log('Could not create Africa : Repository Error', error)
        throw new Error}

}

export const getAllAfrica = async (filter?: any) => {
    try {
        let query: any = {}; // Créez un objet vide pour stocker la requête

        // Si un filtre est fourni, utilisez-le pour construire la requête
        if (filter) {
            query = { ...filter }; // Copiez le filtre dans la requête
        }

        // Utilisation de la méthode find() de Mongoose pour récupérer les articles selon la requête
        const allAfrica = await AfricaModel.find(query);
        return allAfrica;

    } catch(error) {
        console.error('Could not get all Africa articles : Repository Error', error);
        throw new Error('Impossible de récupérer tous les articles Africa : Erreur du Repository');
    }
}


export const getAfricaById = async (id: string) => {
    try {
        // Récupérer l'article par son ID
        const article = await AfricaModel.findById(id);
        return article;

    } catch(error) {
        console.error('Could not get article by id or other articles with same category : Repository Error', error);
        throw new Error('Impossible de récupérer l\'article par id ou les autres articles avec la même catégorie : Erreur du Repository');
    }
};


export const deleteAfricaById = async (id: string) => {
    try {
        const deletedAfrica = await AfricaModel.findByIdAndDelete(id);
        return deletedAfrica;
    } catch (error) {
        console.error('Could not delete Africa by id : Repository Error', error);
        throw new Error('Impossible de supprimer l\'article Africa par id : Erreur du Repository');
    }
}

export const updateAfricaById = async (id: string, africa: Africa) => {
    try {
        const updatedAfrica = await AfricaModel.findByIdAndUpdate(id, africa, { new: true });
        return updatedAfrica;
    } catch (error) {
        console.error('Could not update Africa by id : Repository Error', error);
        throw new Error('Impossible de mettre à jour l\'article Africa par id : Erreur du Repository');
    }
}

