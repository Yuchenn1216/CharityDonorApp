# Charity Collection Mobile App

A React Native mobile application that allows users to manage and browse through their charity collections. Users can create accounts, log in, and maintain their personal charity collections with detailed information.

## Features

- User Authentication
  - Register new account
  - Login with email and password
  - Secure password storage

- Charity Management
  - Create and manage charity collections
  - Add, edit, and delete charities within collections
  - Filter charities by categories
  - View detailed charity information

- User Interface
  - Clean and intuitive navigation using Stack and Tab Navigation
  - Custom components for consistent UI/UX
  - Responsive design for various screen sizes

## Installation

### Prerequisites
- Node.js installed
- VS Code or preferred code editor
- Android Studio installed
- Expo CLI installed globally

### Setup Steps

1. Clone the Repository
   ```bash
   git clone <repository-url>
   
3. Install Dependencies
   ```bash
   npm install
   
5. Start the Project
   ```bash
   expo start
   
7. Setup Android Environment
  - Open Android Studio
  - Ensure an Android emulator is running
  - Press 'a' in the terminal running expo to open the app in Android emulator
  - Or press 'i' in the terminal if you prefer to use iOS simulator

### Peferred OS and devide:
OS:android
Device: Pixel 6 (6.4"Size)

### Description for tests

The first test, "AppError contains text," is a unit test because it verifies the rendering and styling of the AppError component in isolation. It doesn't rely on external systems,like system or integration test. It ensures consistent text display with specified font attributes across platforms.

The second test, "AppCategory contains category and iconImage," is a unit test that verifies rendering and structure of AppCategory. It doesn't rely on external systems and components, so it's a unit test. This test validates the presence and properties of an image and label within the AppCategory component.
