import api from "@/lib/axios";

export async function getDashboard() {
    try {
        const res = await api.get("/dashboard");
        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch dashboard"
        );
    }
}

export async function getClaimChart(year?: number) {
    try {
        const res = await api.get("/claims/chart", {
            params: { year },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch claim chart"
        );
    }
}