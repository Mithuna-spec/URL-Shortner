import urlSchema from '../models/short_url.model.js';
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
    const newUrl = new urlSchema({
    fullUrl:longUrl,
    shortUrl:shortUrl
});
if(userId){
    newUrl.user_id=userId;
}
 await newUrl.save()
}catch(err){
    console.error("Error saving short URL:", err);
    throw new Error("Error saving short URL");
}
};


export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({shortUrl:shortUrl}, { $inc: { clicks: 1 } });
};

export const getCustomShortUrl = async (shortUrl) => {
    return await urlSchema.findOne({shortUrl:shortUrl});
}
