import axiosInstance from "../utils/axiosInstance";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:5000";

// Function to create a short URL
export const createShortUrl = async (url) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/api/create`, {
            url: url,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// You can add more API functions here in the future
// Example:
// export const getUrlStats = async (shortId) => {
//     const response = await axios.get(`${API_BASE_URL}/api/stats/${shortId}`);
//     return response.data;
// };
