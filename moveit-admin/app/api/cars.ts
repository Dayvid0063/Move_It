import { backendUrl } from "./backend-url";

// Create a new car
export async function createCar(carData: {
    name: string;
    brandId: string;
    plateNumber: string;
    carStatus: string;
    pricePerDay: number;
    passengerCapacity: number;
    features: string[];
    description: string;
    images: string[];
}) {
    const response = await fetch(`${backendUrl}/api/cars/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
        // Ensures cookies are included
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to create car");
    }
    return response.json();
}

// Get all cars
export async function getCars() {
    const response = await fetch(`${backendUrl}/api/cars`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cars");
    }
    return response.json();
}

// Get a single car by ID
export async function getCarById(carId: string) {
    const response = await fetch(`${backendUrl}/api/cars/${carId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch car");
    }
    return response.json();
}

// Update a car
export async function updateCar(carId: string, carData: Partial<{
    name: string;
    plateNumber: string;
    carStatus: string;
    pricePerDay: number;
    passengerCapacity: number;
    description: string;
    images: string[];
    features: string[];
    brandId: string;
}>) {
    const response = await fetch(`${backendUrl}/api/cars/update/${carId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to update car");
    }
    return response.json();
}

// Delete a car
export async function deleteCar(carId: string) {
    const response = await fetch(`${backendUrl}/api/cars/delete/${carId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to delete car");
    }
    return response.status;
}
