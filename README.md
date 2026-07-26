# Task Management System

A production-ready task management API built with TypeScript, Express, MongoDB, JWT authentication, testing, and scalable backend architecture.

## Overview

Task Management System is a backend application designed to manage tasks efficiently with secure authentication and a clean layered architecture.

The project follows professional backend development practices including separation of concerns, repository pattern, service layer architecture, validation, centralized error handling, and automated testing.

## Features

- User registration and authentication
- Secure password hashing with bcrypt
- JWT-based authentication
- Create, read, update, and delete tasks
- User-based task ownership
- Task status management
- Task priority management
- Request validation
- Centralized error handling
- Repository Pattern architecture
- Service Layer architecture
- Automated API testing

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JWT (JSON Web Token)
- bcryptjs
- Authentication Middleware

### Validation

- Joi

### Testing

- Jest
- Supertest
- MongoDB Memory Server

## Architecture

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

This architecture improves scalability, maintainability, and testability.

## Project Structure

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
    │   ├── controllers
    │   ├── services
    │   ├── repositories
    │   ├── models
    │   ├── routes
    │   ├── middleware
    │   ├── interfaces
    │   └── server.ts
    │
    ├── tests
    │
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
```

## Installation

Clone the repository:

```bash
git clone https://github.com/DaryaMarco/task-management-system-TS.git
```

Navigate to server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Running the Project

Start development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## API Testing

The project uses:

- Jest for testing framework
- Supertest for API requests
- MongoDB Memory Server for isolated database testing

## Future Improvements

- Docker containerization
- CI/CD pipeline with GitHub Actions
- Cloud deployment
- React frontend application
- Advanced authorization system
- API rate limiting improvements

## Author

Developed by Darya