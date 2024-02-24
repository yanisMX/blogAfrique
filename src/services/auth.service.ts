import exp from 'constants';
import * as jwtUtils from '../utils/jwt.utils';
import * as userService from './user.service';

export const login = async (email : any, password : any) => {
        try {
            const user = await userService.getUserByEmail(email);
            const userRole = user.userRole
            if (!user) throw new Error('User not found');
    
            const isPasswordCorrect = jwtUtils.comparePassword(password, user.userPassword);
            if (!isPasswordCorrect) throw new Error('Incorrect password');
    
            const accessToken = jwtUtils.generateAccessToken({ email: email, role: userRole});
            const refreshToken = await jwtUtils.generateRefreshToken({ email: email, role : userRole});
            return { accessToken, refreshToken};
            
        } catch (error) {
            throw error;
        }
    }

export const validateAccessToken = async (accessToken : any) => {
    try {
        const decodedToken = jwtUtils.decodeAccessToken(accessToken);
        return decodedToken;
    } catch (error) {
        throw error;
    }
}

export const logout = async (accessToken : any) => {
    try {
        jwtUtils.addToBlacklist(accessToken);
        return { message: 'User successfully logged out'};
    } catch (error) {
        throw error;
    }
}