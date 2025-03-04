"use client";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateUserProfile } from "@/app/api/auth";

type UserProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password?: string;
  confirmPassword?: string;
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    isError: false,
  });
  const [formData, setFormData] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Get user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData) as UserProfileData;
      setFormData(user);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure passwords match
    if (formData.password && formData.password !== formData.confirmPassword) {
      setShowAlert({
        show: true,
        message: "Passwords do not match",
        isError: true,
      });
      return;
    }

    try {
      await updateUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      setIsEditing(false);
      setShowAlert({
        show: true,
        message: "Profile updated successfully!",
        isError: false,
      });

      // Update local storage with the new data
      localStorage.setItem("user", JSON.stringify(formData));

      setTimeout(
        () => setShowAlert({ show: false, message: "", isError: false }),
        3000
      );
    } catch (error) {
      setShowAlert({
        show: true,
        message: "Failed to update profile",
        isError: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {showAlert.show && (
          <Alert
            className={
              showAlert.isError
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }
          >
            <AlertDescription
              className={showAlert.isError ? "text-red-800" : "text-green-800"}
            >
              {showAlert.message}
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your first name" // Added placeholder
                    className="w-full p-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your last name" // Added placeholder
                    className="w-full p-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your email address" // Added placeholder
                  className="w-full p-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number" // Added placeholder
                  className="w-full p-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  disabled={true}
                  title="Your user role" // Added title for screen readers
                  className="w-full p-2 border rounded-md bg-gray-50 text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter new password"
                  className="w-full p-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Confirm new password"
                  className="w-full p-2 border rounded-md disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
