export async function getDashboard() {
    const res = await fetch(`http://localhost:8080/api/dashboard`);

    if (!res.ok) {
        throw new Error("Failed to fetch dashboard");
    }

    return res.json();
}