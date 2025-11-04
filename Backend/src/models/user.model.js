import mongoose from "mongoose";
import { createHash } from "crypto";

/**
 * Generate Gravatar URL from email address
 * @param {string} email - User's email address
 * @param {number} size - Image size (default: 200)
 * @param {string} defaultImage - Default image type (default: 'identicon')
 * @returns {string} Gravatar URL
 */
const generateGravatar = (email, size = 200, defaultImage = 'identicon') => {
    if (!email) {
        return null;
    }

    // Create MD5 hash of email
    const hash = createHash('md5')
        .update(email.toLowerCase().trim())
        .digest('hex');

    // Return Gravatar URL
    return `https://www.gravatar.com/avatar/${hash}?d=${defaultImage}&s=${size}`;
};

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:null,
    },
    gravatar:{
        type:String,
        default:null,
    },

},
{timestamps:true}
);

// Pre-save hook to automatically generate gravatar if not set
userSchema.pre('save', function(next) {
    if (this.isModified('email') || !this.gravatar) {
        this.gravatar = generateGravatar(this.email);
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
