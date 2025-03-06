# MoveIt Admin

MoveIt Admin is a web-based administration dashboard built with **Next.js** for managing the MoveIt mobile car rental application. The admin site complements the mobile app by providing a robust interface for administrators to oversee bookings, brands, and rental packages.

## Overview
MoveIt Admin is designed to empower administrators with tools to manage the car rental system. It provides a user-friendly interface to add, edit, and delete cars, manage car brands, oversee rental packages, and monitor bookings. Built with modern web technologies, the dashboard ensures responsiveness and seamless integration with cloud services like Cloudinary for image uploads.


## Key Features

### 1. Dashboard Home
- **Fleet Overview**: Displays a summary of the car inventory with filtering by status (Available, Rented, Maintenance).
- **Booking Management**: Shows upcoming and recent bookings with details like customer name, car, dates, and status.
- **Quick Stats**: Provides key metrics such as total cars, active rentals, upcoming bookings, and total revenue with trend indicators.
- **Quick Actions**: Easy access to add new cars or manage brands.

### 2. Car Management
- **Add New Car**: Form to input car details (name, brand, plate number, status, price, capacity, features, description) with image uploads via Cloudinary.
- **Edit Car**: Update existing car details and manage associated images.
- **Cars List**: Table view of all cars with options to edit or delete, including status indicators and image previews.
- **Delete Confirmation**: Alert dialog to confirm car deletion, ensuring data integrity.

### 3. Brand Management
- **Create Brands**: Add new car brands with names and images.
- **Edit Brands**: Modify existing brand details in a dialog interface.
- **Delete Brands**: Remove brands
- **Brand Listing**: Table displaying all brands with their images and action buttons.

### 5. User Interface
- **Responsive Sidebar**: Menu items for Dashboard, Cars (with submenu), and Profile.
- **Form Validation**: Zod-based validation for all forms to ensure data quality.
- **Interactive Components**: Dropdowns, dialogs, and tables enhance usability.

### 6. Integration
- **Cloudinary**: Seamless image upload for cars and brands.
- **API Calls**: Asynchronous operations for fetching and updating data (e.g., `getCars`, `createCar`, `getCarBrands`).

## Technologies Used
- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: Core library for building UI components.
- **TypeScript**: Static typing for improved code reliability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn UI**: Component library for reusable UI elements (Card, Form, Table, etc.).
- **Zod**: Schema validation for forms.
- **Next-Cloudinary**: Integration for image uploads.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dayvid0063/Move_It.git
   cd moveit-admin
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add environment variables (Cloudinary credentials):
     ```env
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
     ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

   AdminLogin Details for ALX mentors testing
   Username: moveitrentals1@gmail.com
   Password: MoveIt@rentals1


Happy renting with MoveIt! 🚗

