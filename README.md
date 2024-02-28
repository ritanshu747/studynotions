# studtynotion

Welcome to the studtynotion project! This project aims to replicate some of the features and functionalities of the Udemy website, a popular online learning platform.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The studtynotion project is a demonstration of how one can create a simplified version of the Udemy website, focusing on core functionalities such as course browsing, enrollment, and instructor features.

## Features

- User Authentication: Allow users to sign up, log in, and manage their accounts.
- Course Browsing: Browse through a catalog of courses based on categories and keywords.
- Course Enrollment: Enroll in courses, track progress, and access course materials.
- Instructor Dashboard: Allow instructors to create and manage their courses, monitor student progress, and engage with students.
- Search Functionality: Search for courses based on keywords and filters.
- Responsive Design: Ensure the website is accessible and user-friendly across various devices and screen sizes.

## Technologies Used

- **Frontend:**
  - React.js (Work in Progress)

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB

- **Authentication and Authorization:**
  - JWT (JSON Web Tokens): Used for secure authentication. JWTs are generated upon successful login and sent to the client, where they are stored as cookies or in local storage. They are then included in subsequent requests to authenticate users and grant access to protected routes.
  - Cookies: Cookies are used to store JWTs securely on the client-side. They are sent along with every request to the server, allowing the server to verify the authenticity of the user.
  - Authorization: Middleware in Express.js is used to protect routes that require authentication. It verifies the JWT included in the request header and grants access only to authenticated users.

- **Cloudinary:**
  - Cloudinary is used for media management, including uploading, storing, and manipulating images and videos. It provides a secure and scalable solution for handling media assets in the application.

- **Additional Tools:**
  - Redux for state management
  - Axios for API requests
  - Material-UI for styling

## Installation

To run the studtynotion locally, follow these steps:

1. Clone this repository to your local machine:
    ```
    git clone https://github.com/ritanshu747/studynotions.git
    ```

2. Navigate to the project directory:
    ```
    cd studynotions
    ```

3. Install dependencies:
    ```
    npm install
    ```

4. Create a `.env` file in the root directory of the project and add necessary environment variables (e.g., database connection string, JWT secret key).

5. Start the development server:
    ```
    npm start
    ```

6. Open your browser and navigate to http://localhost:3000 to see the application running.

## Usage

Once the application is running, you can register as a new user or log in with an existing account. Explore the course catalog, enroll in courses, and interact with the instructor dashboard if you have instructor privileges.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.


