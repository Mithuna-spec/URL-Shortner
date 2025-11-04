import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email, password) => {
    const response = await axiosInstance.post("/api/auth/login", {email, password});
    return response.data;
}
export const registerUser = async (username, email, password) => {
    const response = await axiosInstance.post("/api/auth/register", {username, email, password});
    return response.data;
}

export const logoutUser = async () => {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
}