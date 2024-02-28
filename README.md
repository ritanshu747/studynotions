StudyNotion

StudyNotion is a platform designed to help users organize, collaborate, and share study-related materials effectively. It provides features for creating, editing, and sharing notes, as well as collaborating with others in real-time. Additionally, StudyNotion offers functionalities for managing study resources efficiently, including user authentication, document upload using Cloudinary, payment integration with Razorpay, and a user-friendly interface powered by Material-UI.
Technologies Used

    MongoDB
    Express.js
    React.js
    Node.js
    Cloudinary
    Razorpay
    JSON Web Tokens (JWT)
    Material-UI

Installation

    Clone the repository:

    bash

git clone <repository-url>

Install dependencies:

    Navigate to the backend directory:

    bash

cd backend

Install backend dependencies:

    npm install

Set up environment variables:

    Create a .env file in the backend directory.
    Define environment variables such as database connection URI, Cloudinary credentials, Razorpay API keys, and JWT secret key in the .env file.

Start the backend server:

sql

    npm start

Backend API Endpoints

    POST /api/auth/signup
        Register a new user.

    POST /api/auth/login
        Login an existing user.

    GET /api/user/profile
        Get user profile information.

    POST /api/upload
        Upload documents to Cloudinary.

    POST /api/payment
        Process payments using Razorpay.

Frontend Development (Under Progress)

The frontend development of StudyNotion is currently in progress. Stay tuned for updates on the frontend implementation.
Contributing

Contributions are welcome! If you'd like to contribute to StudyNotion, please fork the repository, make your changes, and submit a pull request.
License

This project is licensed under the MIT License.
