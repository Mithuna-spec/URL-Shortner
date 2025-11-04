import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoID = (length) => {
    return nanoid(length);
}

export const signToken = (payload)=>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: '24h'
    });
}

export const verifyToken = (token)=>{
    //return jsonwebtoken.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    return decoded;
}