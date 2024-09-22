# Application Step up with Docker

1. Ensure Docker and Git are installed on your system.
2. Clone the project using git clone https://github.com/rehamza/fullstack-eg.git.
3. Navigate to the "fullstack-eg" directory.
4. Run docker-compose up --build.
5. Verify that the frontend and backend are working by visiting:
   Frontend: http://localhost:3000
   Backend: http://localhost:8000/api

# Application Step up Manual

1. Ensure you have installed Node.js (version 22 or above), MongoDB, and Git.
2. Clone the project using git clone https://github.com/rehamza/fullstack-eg.git.
3. For frontend: Navigate to the "frontend" directory inside "fullstack-eg". Run `npm install` to install dependencies, then run `npm run dev` to start the project.
4. For backend: Navigate to the "backend" directory inside "fullstack-eg". Run `npm install` to install dependencies, then run `npm start` to start the project.
5. Verify that the frontend and backend are working by visiting:
   Frontend: http://localhost:3000
   Backend: http://localhost:8000/api

# fullstack-eg

This is simple application for login and sign up build on React and node js

## Frontend

1.  Next.js: A React-based framework that supports both server-side and client-side rendering. According to React's official documentation, Next.js is recommended for building modern web applications as it allows you to choose client-side or server-side rendering depending on the needs of each page.
2.  Tailwind CSS: A utility-first CSS framework that provides flexibility, speed, and a wide range of built-in components for styling the application.
3.  SWR (Stale-While-Revalidate): A data fetching library used to cache API data, allowing the application to avoid redundant API requests. It revalidates the cache when necessary, ensuring fresh data without excessive requests.

## Backend

1. NestJS: A Node.js framework that enforces a modular and structured design pattern, making development more maintainable. It also includes many built-in features for common backend tasks.
2. Passport and JWT: Used for user authentication. Passport handles authentication strategies, while JWT (JSON Web Token) manages sessionless authentication.
3. Joi and Class Validator: Joi is used for validating environment variables, and Class Validator ensures proper validation for Data Transfer Objects (DTOs).
4. MongoDB: The database used to store and manage application data
