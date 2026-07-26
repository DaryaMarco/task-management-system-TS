# Task Management System

A production-ready Task Management API built with **TypeScript, Express.js, MongoDB, JWT Authentication, Swagger, Jest, and Supertest** following a scalable layered backend architecture.

---

## Overview

Task Management System is a backend application designed to manage user tasks securely and efficiently.

The project follows professional backend development practices including:

- Layered architecture
- Repository Pattern
- Service Layer Pattern
- JWT authentication
- Request validation
- Centralized error handling
- API documentation with Swagger
- Automated API testing

The goal of this project is to demonstrate a scalable and maintainable backend structure suitable for real-world applications.

---

# Features

## Authentication

- User registration
- User login
- JWT-based authentication
- Secure password hashing with bcrypt

## Task Management

- Create tasks
- Get authenticated user's tasks
- Get task by ID
- Update tasks
- Delete tasks
- Task ownership management
- Task status management
- Task priority management

## Backend Features

- TypeScript implementation
- Express.js REST API
- MongoDB database integration
- Mongoose ODM
- Repository Pattern
- Service Layer Architecture
- Joi request validation
- Centralized error handling
- Authentication middleware

## Documentation & Testing

- Swagger API Documentation
- Jest testing framework
- Supertest API testing
- MongoDB Memory Server for isolated tests

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- MongoDB
- Mongoose

## Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- Authentication Middleware

## Validation

- Joi

## Testing

- Jest
- Supertest
- MongoDB Memory Server

## Documentation

- Swagger UI
- swagger-jsdoc

---

# Architecture

The project follows a layered backend architecture:

```
Request
   |
   ↓
Route
   |
   ↓
Controller
   |
   ↓
Service
   |
   ↓
Repository
   |
   ↓
Model
   |
   ↓
MongoDB
```

This architecture provides:

- Better separation of concerns
- Easier maintenance
- Improved scalability
- Better testability

---

# Project Structure

```
task-management-system-TS

│
├── client
│
├── docs
│
└── server
    │
    ├── src
    │   │
    │   ├── controllers
    │   ├── services
    │   ├── repositories
    │   ├── models
    │   ├── routes
    │   ├── middleware
    │   ├── validators
    │   ├── interfaces
    │   └── server.ts
    │
    ├── tests
    │
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/DaryaMarco/task-management-system-TS.git
```

Navigate into the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Running the Project

## Development Mode

```bash
npm run dev
```

The server will run on:

```
http://localhost:5000
```

---

# API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

Swagger allows you to:

- View all available endpoints
- Test API requests
- Send JWT tokens
- Explore request and response schemas

---

# API Endpoints

## Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user and receive JWT token | Public |

---

## Tasks

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/tasks` | Create a task | Required |
| GET | `/api/tasks` | Get user's tasks | Required |
| GET | `/api/tasks/:id` | Get task by ID | Required |
| PATCH | `/api/tasks/:id` | Update task | Required |
| DELETE | `/api/tasks/:id` | Delete task | Required |

---

# Authentication Flow

Protected routes require a valid JWT token.

Request flow:

```
Client Request

      ↓

Authentication Middleware

      ↓

Controller

      ↓

Service Layer

      ↓

Repository Layer

      ↓

MongoDB
```

---

# API Testing

The project includes automated tests using:

- Jest
- Supertest
- MongoDB Memory Server

Tests cover:

- User registration
- User login
- Task creation
- Task retrieval
- Task updating
- Task deletion

Run tests:

```bash
npm test
```

---

# Security Features

The application includes:

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Request validation
- Centralized error handling
- Secure authentication workflow

---

# Future Improvements

Planned improvements:

- Docker containerization
- CI/CD pipeline with GitHub Actions
- Cloud deployment
- React frontend application
- Advanced authorization roles
- Pagination and filtering
- Task due dates and reminders

---

# Author

Developed by **Darya**