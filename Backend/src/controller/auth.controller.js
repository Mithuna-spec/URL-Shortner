import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
import wraAsync from "../utils/trycatchWrapper.js";

export const register_user = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const result = await registerUser(username, email, password);
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: result.token,
            user: result.user
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Registration failed"
        });
    }
    //res.cookie("accessToken", result.token, cookieOptions);
};

export const login_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await loginUser(email, password);
        
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: result.user
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Login failed"
        });
    }
};