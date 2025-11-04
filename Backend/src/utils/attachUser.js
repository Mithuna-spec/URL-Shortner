import { verifyToken } from "./helper.js"
import { findUserById } from "../dao/user.dao.js";

export const attachUser = async (req, res, next)=>{
    //console.log(req.cookies)
    const token = req.cookies.accessToken
    if (!token) return next()
    try{
        const decoded = verifyToken(token);
        console.log(decoded);
        const user = await findUserById(decoded);
        console.log(user,"this one");
        if(!user) return next()
        req.user = user;
        next();
    }
    catch(err){
       console.log(err);
         next();
    }
}