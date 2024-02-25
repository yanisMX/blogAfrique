import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await userService.createUser(user);
    console.log(newUser)
    console.log(user)
    res.status(201).send(newUser);
  } catch (error) {    
    res.status(500).send(error.toString());
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    const email = req.query.email;
    try {
        const user = await userService.getUserByEmail(email);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await userService.getAllUsers();
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).send('Error fetching all users');
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error fetching user by id');
    }
}