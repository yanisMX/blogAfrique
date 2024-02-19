import * as userRepository from '../repositories/user.repository';
import * as jwtUtils from '../utils/jwt.utils';

function checkEmailFormat(email) {
    return email.includes("@");
}

export const createUser = async (user : any) => {
    
    try {
        const isExistingUser = await userRepository.findUserByEmail(user.email);
        if(user.password.length < 8) throw new Error('Password must be at least 8 characters long');
        if(user.email.length < 8) throw new Error('Email must be at least 8 characters long');
        if(!checkEmailFormat(user.email)) throw new Error('Email must be in the correct format');
        if(user.isAdmin === undefined){
            user.isAdmin = false;
            user.role = "user";} else{
            user.role = "admin";
        }
        

        user.password = jwtUtils.hashPassword(user.password);
        if (isExistingUser.length !== 0){
            console.log(isExistingUser.length);
            throw new Error('User already exists');
        } 

        

        const newUser = await userRepository.createUser(user);
        
        return newUser;
    }
    catch (error) {
        throw error;
    }
}

export const getUserByEmail = async (email : any) => {
    try {
        const user = await userRepository.findUserByEmail(email);
        const userPassword = user[0].password;
        return {user, userPassword};
    }
    catch (error) {
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const allUsers = await userRepository.getAllUsers();
        return allUsers;
    } catch (error) {
        throw new error('Error getting all users');
    }
}