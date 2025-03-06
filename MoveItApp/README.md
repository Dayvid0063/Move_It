# MoveIt - Car Rental App

MoveIt is a mobile car rental application built using **React Native** and **Expo**. It allows users to browse, explore, book, and manage car rentals with a sleek and user-friendly interface. The app integrates modern UI/UX practices, payment gateways, and an onboarding experience for a seamless user journey.

## Overview

MoveIt provides a platform for users to:
- Onboard with an engaging introduction to the app.
- Register and log in securely with form validation.
- Explore a variety of cars with filters for brands, price ranges, and features.
- View detailed car information, including images, pricing, and availability.
- Book cars with date selection and payment integration via Flutterwave.
- Manage bookings and user profiles.
- Navigate through a tab-based interface for Home, Explore, Bookings, and Profile sections.

The app leverages Expo Router for navigation, React Native Reanimated and Moti for animations, and a custom theme for consistent styling.

## Key Features

### 1. Onboarding Experience
- Introduces users to the app with a swipeable slideshow featuring three slides: car rental, chauffeur services, and premium fleet selection.
- Uses Moti for animations, BlurView for background effects, and a "Skip" or "Start" button to navigate to the login screen.

### 2. Authentication
- **Login:** Allows users to log in with email and password
- **Register:** Provides a form for new users to sign up with fields for first name, last name, email, phone number, and password (with confirmation). Includes validation for email and phone number.
- **Auth Layout:** Manages navigation for authentication screens (onboarding, login, register, forgot password, verification) with a stack navigator.

### 3. Tab Navigation
- A customizable bottom tab bar with blur effects, icons from MaterialCommunityIcons, and dynamic styling for active/inactive states.
- Tabs include Home, Explore, My Bookings, and Profile.

### 4. Home Screen
- Displays top brands and popular vehicles with a refresh control.
- Fetches data from APIs (`getBrands`, `getCars`) and integrates user data from AsyncStorage.
- Features a header with user greetings and business branding.

### 5. Explore Screen
- Allows users to search and filter cars by name, brand, price range, and features.
- Displays a grid of car cards with images, status tags (Available, Rented, Maintenance), and pricing.

### 6. Car Details
- Shows detailed car information, including a swipeable image carousel, brand badge, features list, and pricing.
- Supports favoriting cars.
- Includes a "Book Now" button that navigates to the booking screen if the car is available.

### 7. Car Bookings
- Enables users to select start and end dates using a DateTimePicker.
- Calculates total cost based on rental duration and integrates Flutterwave for payments.
- Features a terms and conditions modal with a checkbox for user consent.

### 8. My Bookings
- Lists user bookings with details like car name, dates, location, amount, and status (upcoming, ongoing, completed, cancelled).
- Uses a FlatList with a custom booking card design and navigation to booking details.

### 9. User Profile
- Displays user information (name, email, phone).

## Components

The app includes reusable components in the `components` folder. Here are some notable components:
- **CarCard.tsx:** Displays individual car details in a card format.
- **CarLoader.tsx:** A loading animation component used across screens.
- **Headers.tsx:** Renders the header section for the Home screen, displaying user greetings and business branding.
- **PopularVehicles.tsx:** Shows a list of popular vehicles on the Home screen.
- **TopBrand.tsx:** Displays top car brands on the Home screen.

## Tech Stack
- **React Native**: Core framework for building the app.
- **Expo**: Development platform and tooling.
- **Expo Router**: File-based navigation system.
- **Flutterwave**: Payment gateway integration.
- **React Native Reanimated & Moti**: Smooth animations for UI elements.
- **MaterialCommunityIcons**: Icon library for tab bar and UI elements.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Dayvid0063/Move_It.git
   cd MoveItApp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the App**
   - Start the Expo development server:
     ```bash
     npx expo start
     ```
   - Use the Expo Go app on your mobile device or an emulator to run the app.

---

Happy renting with MoveIt! 🚗
