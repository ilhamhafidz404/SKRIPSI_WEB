import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor Request
api.interceptors.request.use(
    async (config) => {
        // Ambil session NextAuth secara real-time
        const session = await getSession();
        const token = session?.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor Response (Otomatis handle 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Token mungkin salah atau expired.");
            // Opsional: Redirect ke login atau logout
        }
        return Promise.reject(error);
    }
);

export default api;