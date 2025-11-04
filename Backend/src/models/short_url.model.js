import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
        },
    clicks:{
        type:Number,
        required:true,
        default:0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",}
},
{timestamps:true}
);

shortUrlSchema.index({shortUrl:1}, {unique:true});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;
