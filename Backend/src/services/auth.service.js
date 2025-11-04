import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { ConflictError, UnauthorizedError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";
import bcrypt from 'bcrypt';

export const registerUser = async (username, email, password) => {
    const user = await findUserByEmail(email);
    if(user){
        throw new ConflictError("User already exists");
    }
    
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);
    const token = signToken({id: newUser._id});

    return {
        token,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    };
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = signToken({id: user._id});

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
}