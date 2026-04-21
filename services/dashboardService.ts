import API_URL from "@/lib/api";

export async function getDashboard() {
    const res = await fetch(`${API_URL}/dashboard`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch dashboard");
    }

    return res.json();
}