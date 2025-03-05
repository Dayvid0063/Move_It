import { backendUrl } from "./backend-url";

// Create a new car brand
export async function createCarBrand(brandData: { name: string }) {
    const response = await fetch(`${backendUrl}/api/brands/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
        // Ensures cookies are included
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to create car brand");
    }
    return response.json();
}

// Get all car brands
export async function getCarBrands() {
    const response = await fetch(`${backendUrl}/api/brands`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch car brands");
    }
    return response.json();
}

// Get a single car brand by ID
export async function getCarBrandById(brandId: string) {
    const response = await fetch(`${backendUrl}/api/brands/${brandId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch car brand");
    }
    return response.json();
}

// Update a car brand
export async function updateCarBrand(brandId: string, brandData: Partial<{ name: string }>) {
    const response = await fetch(`${backendUrl}/api/brands/update/${brandId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to update car brand");
    }
    return response.json();
}

// Delete a car brand
export async function deleteCarBrand(brandId: string) {
    const response = await fetch(`${backendUrl}/api/brands/delete/${brandId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to delete car brand");
    }
    return response.status;
}
