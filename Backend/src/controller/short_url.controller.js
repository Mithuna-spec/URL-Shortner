import { getShortUrl } from '../dao/short_url.js';
import {createShortUrlWithoutUser} from '../services/short_url.service.js';
import wraAsync from '../utils/trycatchWrapper.js';

export const createShortUrl = async (req, res)=>{
    const {url} = req.body
    let shortUrl 
    if(req.user){
        shortUrl = await createShortUrlWithUser(url, req.user._id);
    }else{
        shortUrl = await createShortUrlWithoutUser(url);
    }
    res.status(200).json({
        shortUrl: process.env.APP_URL+"/"+shortUrl
    });
    
}
export const redirectFromShortUrl = async (req, res)=>{
    const {id} = req.params;
    const url = await getShortUrl(id);
    if (!url) {
        return res.status(404).send("URL not found");
    }
    res.redirect(url.fullUrl)
}

export const createCustomShortUrl = async (req, res)=>{
    const {url, customUrl} = req.body;
    const shortUrl = await createShortUrlWithoutUser(url, customUrl);
    res.send(process.env.APP_URL+"/"+shortUrl);
}