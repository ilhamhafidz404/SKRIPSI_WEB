import api from "@/lib/axios";


export async function getDashboard() {
    try {
        const res = await api.get("/dashboard");
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch dashboard");
    }
}