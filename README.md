# Task Management System

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/Docs-Swagger-brightgreen)
![Tests](https://img.shields.io/badge/Tests-Jest-red)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)

A production-ready Task Management API built with **TypeScript, Express.js, MongoDB, JWT Authentication, Swagger, Jest, Supertest, and Docker** following a scalable layered backend architecture.

---

# Overview

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
- Docker containerization
- Health monitoring

The goal of this project is to demonstrate a scalable, maintainable, and production-oriented backend structure suitable for real-world applications.

---

# Features

## Authentication

- User registration
- User login
- JWT-based authentication
- Secure password hashing with bcrypt

---

## Task Management

- Create tasks
- Get authenticated user's tasks
- Get task by ID
- Update tasks
- Delete tasks
- Task ownership management
- Task status management
- Task priority management

---

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

---

## Documentation & Testing

- Swagger API Documentation
- Jest testing framework
- Supertest API testing
- MongoDB Memory Server for isolated tests

---

## Docker Features

- Dockerized backend application
- Docker Compose orchestration
- MongoDB container
- Persistent MongoDB volume
- Custom Docker network
- API healthcheck
- MongoDB healthcheck
- Automatic container restart policy

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

## DevOps

- Docker
- Docker Compose

---

# Swagger API Documentation

Interactive API documentation is available through Swagger UI.

Swagger allows you to:

- View all available endpoints
- Test API requests
- Send JWT authentication tokens
- Explore request and response schemas


Swagger UI:

```
http://localhost:5000/api-docs
```


Screenshots:

![Swagger UI](docs/swagger-ui.png)

![Swagger AUTH UI](docs/swagger-AUTH-ui.png)

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
    ├── Dockerfile
    ├── docker-compose.yml
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

Navigate into backend folder:

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

# Docker Setup

The project is fully containerized using Docker and Docker Compose.

Docker runs:

- Node.js API container
- MongoDB container
- Internal Docker network
- Persistent database storage
- Health monitoring


## Requirements

Install:

- Docker
- Docker Compose


## Start Application with Docker

Navigate to server folder:

```bash
cd server
```


Build and run containers:

```bash
docker compose up --build
```


Application will be available at:

```
http://localhost:5000
```


---

## Docker Services

| Service | Container | Port |
|---|---|---|
| API | task-management-api | 5000 |
| MongoDB | task-management-mongodb | 27017 |


---

## Health Checks

API health endpoint:

```
GET /health
```


Example response:

```json
{
  "status": "OK",
  "message": "API is running",
  "timestamp": "2026-07-28T18:55:28.412Z"
}
```


Docker automatically checks:

```
http://localhost:5000/health
```


MongoDB health:

```
db.adminCommand('ping')
```


---

## Docker Commands

Stop containers:

```bash
docker compose down
```


Remove containers and database volume:

```bash
docker compose down -v
```


View running containers:

```bash
docker ps
```


View logs:

```bash
docker compose logs -f
```


Rebuild:

```bash
docker compose up --build
```

---

# API Documentation

Swagger UI:

```
http://localhost:5000/api-docs
```

Swagger allows you to:

- View endpoints
- Test requests
- Send JWT tokens
- Explore schemas

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

- GitHub Actions CI/CD pipeline
- Cloud deployment
- React frontend application
- Advanced authorization roles
- Pagination and filtering
- Task due dates and reminders
- Redis caching
- Logging and monitoring improvements

---

# Author

Developed by **Darya**