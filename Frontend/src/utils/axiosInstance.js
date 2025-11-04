//axios ka instance banao
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor - runs before every request
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens here in the future
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        console.log("📤 Request:", config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Response Interceptor - runs after every response
axiosInstance.interceptors.response.use(
    (response) => {
        // Success response
        console.log("✅ Response:", response.status, response.config.url);
        return response;
    },
    (error) => {
        // Error handling
        console.error("❌ Response Error:", error);

        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    error.message = data.message || "Bad Request - Invalid data provided";
                    break;
                case 401:
                    error.message = "Unauthorized - Please login again";
                    // You can redirect to login page here
                    // window.location.href = '/login';
                    break;
                case 403:
                    error.message = "Forbidden - You don't have permission";
                    break;
                case 404:
                    error.message = data.message || "Not Found - Resource doesn't exist";
                    break;
                case 500:
                    error.message = "Server Error - Please try again later";
                    break;
                case 503:
                    error.message = "Service Unavailable - Server is down";
                    break;
                default:
                    error.message = data.message || `Error ${status} - Something went wrong`;
            }
        } else if (error.request) {
            // Request was made but no response received
            error.message = "Network Error - Cannot connect to server. Please check your connection.";
        } else {
            // Something else happened
            error.message = error.message || "An unexpected error occurred";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;