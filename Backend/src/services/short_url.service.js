import { generateNanoID } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { saveShortUrl } from "../dao/short_url.js";
import { getCustomShortUrl } from "../dao/short_url.js";


export const createShortUrlWithoutUser = async (url)=>{
    const shortUrl =await generateNanoID(7);
    if(!shortUrl) throw new Error("Short URL generation failed");
    await saveShortUrl(shortUrl, url);
    //newUrl.save()
    return shortUrl;
}

export const createShortUrlWithUser = async (url, userId, slug=null)=>{
    const shortUrl =slug || generateNanoID(7);
    const exists = await getCustomShortUrl(slug);
    if(exists) throw new Error("Short URL already exists");

    await saveShortUrl(slug, url, userId);
   // newUrl.save()
    return shortUrl;
}