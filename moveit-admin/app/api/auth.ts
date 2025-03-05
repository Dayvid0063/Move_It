import { backendUrl } from "./backend-url";

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(`${backendUrl}/api/auth/login/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    // Ensures cookies are included
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  return response.json();
}

// Get the authenticated user's profile
export async function getProfile() {
  const response = await fetch(`${backendUrl}/api/auth/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
}

// Update the authenticated user's profile
export async function updateUserProfile(updatedUserData: {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  password?: string;
}) {
  const response = await fetch(`${backendUrl}/api/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }
  return response.json();
}
