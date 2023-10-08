import jwt from "jsonwebtoken";
import secretsService from "./secretsService.js";

class TokenService {
  async generateTokens(user) {
    const PRIVATE_KEY = await secretsService.getSecret("udacity-image-filter-app-secret");
  
    const accessToken = jwt.sign(
      {
        email: user.email,
        tokenType: 'ACCESS_TOKEN',
      },
      PRIVATE_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, algorithm: "RS256" }
    );
    const refreshToken = jwt.sign(
      {
        email: user.email,
        tokenType: 'REFRESH_TOKEN',
      },
      PRIVATE_KEY,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, algorithm: "RS256" }
    );
    return { accessToken, refreshToken };
  }

  decodeToken(token) {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error("Failed to decode JWT token");
    }
    return decodedToken;
  }

  async verifyToken(req) {

    if (!req.headers.authorization) {
      throw new Error("Missing Authorization header");
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const PUBLIC_KEY = await secretsService.getSecret("udacity-image-filter-app-secret");
    try{
      const decodedToken = jwt.verify(token, PUBLIC_KEY, {algorithms: 'RS256'});
      return decodedToken;
    }
    catch(e){
      console.error('verify token error', e);
      throw new Error("Not able to verify token");
    }



  
  

    
  }
}

export default new TokenService();
