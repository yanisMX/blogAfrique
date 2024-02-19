import * as jwtUtils from '../utils/jwt.utils';
import * as userService from './user.service';

export const login = async (email : any, password : any) => {
        try {
            const user = await userService.getUserByEmail(email);
            if (!user) throw new Error('User not found');
    
            const isPasswordCorrect = jwtUtils.comparePassword(password, user.userPassword);
            if (!isPasswordCorrect) throw new Error('Incorrect password');
    
            const accessToken = jwtUtils.generateAccessToken({ email: email});
            const refreshToken = await jwtUtils.generateRefreshToken({ email: email });
            return { accessToken, refreshToken };
        } catch (error) {
            throw error;
        }
    }
