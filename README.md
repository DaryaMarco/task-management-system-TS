# Task Management System API

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/API-Documentation-brightgreen)
![Jest](https://img.shields.io/badge/Testing-Jest-red)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)

A backend Task Management API built with **TypeScript, Express.js, MongoDB, JWT Authentication, Swagger, Jest, Supertest, and Docker** following a scalable layered architecture.

The project demonstrates professional backend development practices including authentication, authorization, testing, API documentation, containerization, and clean architecture principles.

---

# Overview

Task Management System is a RESTful backend application designed to manage tasks securely.

Users can create, update, delete, search and manage their tasks, while administrators can manage users and assign tasks.

The project follows a scalable backend architecture:

- Layered Architecture
- Repository Pattern
- Service Layer Pattern
- Middleware-based security
- Centralized error handling
- Automated testing
- Dockerized environment

---

# Features

## Authentication & Authorization

- User registration
- User login
- JWT Access Token authentication
- Refresh Token authentication
- HttpOnly Cookie based refresh tokens
- Hashed refresh tokens stored in MongoDB
- Role-based authorization
  - User
  - Admin

---

# Task Management

Users can:

- Create tasks
- Get their tasks
- Get task by ID
- Update tasks
- Delete tasks
- Manage task status
- Manage task priority

Admin users can:

- Assign tasks to users
- Manage users
- Access admin protected routes

---

# Advanced Task Features

Implemented:

- Pagination
- Filtering
- Sorting
- Search functionality

Examples:

GET /api/tasks?page=1&limit=10

GET /api/tasks?status=completed

GET /api/tasks?priority=high

GET /api/tasks?sort=createdAt

GET /api/tasks?search=typescript

---

# Backend Architecture

The application follows a layered architecture:

                Request
                   │
                   ▼
                Route
                   │
                   ▼
             Controller
                   │
                   ▼
               Service
                   │
                   ▼
             Repository
                   │
                   ▼
                 Model
                   │
                   ▼
               MongoDB

Benefits:

- Separation of concerns
- Better maintainability
- Easier testing
- Scalable structure

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- MongoDB
- Mongoose ODM

## Authentication

- JWT
- bcryptjs
- Cookie authentication
- Refresh Token rotation

## Validation

- Joi

## Testing

- Jest
- Supertest
- MongoDB Memory Server

## Documentation

- Swagger OpenAPI
- swagger-jsdoc
- swagger-ui-express

## DevOps

- Docker
- Docker Compose

---

# Project Structure

task-management-system-TS/

            └── server/
            ├── src/
            │ ├── config/
            │ ├── controllers/
            │ ├── interfaces/
            │ ├── middleware/
            │ ├── models/
            │ ├── repositories/
            │ ├── routes/
            │ ├── services/
            │ ├── validators/
            │ ├── app.ts
            │ └── server.ts
            │
            ├── tests/
            ├── Dockerfile
            ├── docker-compose.yml
            ├── package.json
            ├── tsconfig.json
            └── .env.example


---

# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/task-management-system-TS.git
```

## Go to Backend

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create `.env` file:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/task-management

JWT_SECRET=your_secret_key
```

---

# Run Application

## Development

```bash
npm run dev
```

Server:

```
http://localhost:5000
```

---

# Swagger Documentation

Swagger UI:

```
http://localhost:5000/api-docs
```

Swagger provides:

- Endpoint documentation
- Request schemas
- Response examples
- JWT authentication testing

---

# Docker Setup

The project is fully containerized using **Docker Compose**.

## Includes

- Node.js API container
- MongoDB container
- Docker network
- Persistent MongoDB volume
- Health checks
- Automatic restart policy

---

## Start

```bash
docker compose up --build
```

## Stop

```bash
docker compose down
```

## Remove Volumes

```bash
docker compose down -v
```

---

# Docker Services

| Service | Container | Port |
|---------|-----------|------|
| API | `task-management-api` | `5000` |
| MongoDB | `task-management-mongodb` | `27017` |

---

# Architecture

```text
              Docker Network

                    |
                    |

        Node.js + Express API

                    |
                    |

                 MongoDB
```

---

# Health Check

## Endpoint

```http
GET /health
```

## Response

```json
{
  "status": "OK",
  "message": "API is running"
}
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/logout` | Logout |

---

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get tasks |
| GET | `/api/tasks/:id` | Get task |
| PATCH | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/tasks/assign` | Assign task (Admin) |

---

## Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get users (Admin) |
| DELETE | `/api/users/:id` | Delete user (Admin) |

---

# Testing

## Testing Tools

- Jest
- Supertest
- MongoDB Memory Server

## Covered

- User registration
- Login
- Authentication
- Task creation
- Task retrieval
- Task update
- Task deletion

## Run Tests

```bash
npm test
```

---

# Security Features

Implemented security:

- Password hashing with bcrypt
- JWT authentication
- Refresh token hashing
- HttpOnly cookies
- Protected routes
- Role authorization
- Joi validation
- Centralized error handling

---

# Future Improvements

Planned:

- GitHub Actions CI/CD
- Cloud deployment
- PostgreSQL migration with Prisma
- Redis caching
- WebSocket notifications
- Monitoring improvements
- Kubernetes deployment

---

# Author

Developed by **Darya**