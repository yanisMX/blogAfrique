import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwt.configs";
import bcrypt from 'bcrypt'

let tokenBlacklist = {};

export const addToBlacklist = (token : string) => {
  tokenBlacklist[token] = true;
};

export const generateAccessToken = (user : any) => {
  const userData = {
    email: user.email,
    role: user.role
  };
  return jwt.sign(user, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

export const generateRefreshToken = async (user : any) => {
  const userData = {
    email: user.email,
    role: user.role
  };
  return jwt.sign(user, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpiresIn });
};

export const decodeAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, jwtConfig.secret);

    return decodedToken;
  } catch (error) {
    throw new Error('Erreur lors du décodage du accessToken');
  }
};

export const decodeRefreshToken = (token) => {  
  try {
    const decodedToken = jwt.verify(token, jwtConfig.refreshSecret);
    return decodedToken;
  } catch (error) {
    throw new Error('Erreur lors du décodage du refreshToken');
  }
}

export const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword
}

export const comparePassword = (password, hashedPassword) => {
  const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
  return isPasswordCorrect
}

