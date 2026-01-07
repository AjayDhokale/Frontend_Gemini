import axios from "axios";
import conf from "../config/config";

const apiClient = axios.create({
    baseURL: `${conf.backendApIUrl}/api/v1`,
    timeout: 15000,
    headers: { "Content-Type": "application/json" }
})

// Attach token automatically
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

// Handle responses globally
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API ERROR:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error.message)
    }
)

export default apiClient