import { backendUrl } from "./backend-url";

// Get all bookings
export async function getCarBrands() {
    const response = await fetch(`${backendUrl}/api/bookings`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch car brands");
    }
    return response.json();
}
