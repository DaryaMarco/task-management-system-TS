# Task Management System API 🚀

A production-ready RESTful Task Management API built with **TypeScript, Node.js, Express.js, MongoDB, Mongoose, JWT, Jest, Supertest, Swagger, Docker, and Render**.

The project demonstrates professional backend development practices including **layered architecture, repository and service patterns, authentication, authorization, resource ownership, validation, testing, API documentation, containerization, and cloud deployment**.

---

🌐 **Live API:** https://task-management-system-ts.onrender.com

📦 **GitHub Repository:** https://github.com/DaryaMarco/task-management-system-TS

---

# Overview

Task Management System is a RESTful backend application designed to securely manage tasks and users.

Authenticated users can create, retrieve, update, search, filter, paginate, and delete their own tasks.

The application also implements role-based authorization and resource ownership to prevent users from accessing or modifying resources belonging to other users.

The project follows a scalable layered architecture:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Model
   ↓
MongoDB
```

---

# Features

## Authentication & Authorization

* User registration
* User login
* JWT Access Token authentication
* Refresh Token authentication
* Refresh Token stored in HttpOnly Cookie
* Refresh Token hashing before database storage
* Refresh Token expiration
* Logout / token revocation
* Role-based authorization

  * User
  * Admin
* Protected routes
* Resource ownership validation

---

# Task Management

Authenticated users can:

* Create tasks
* Get their tasks
* Get a task by ID
* Update tasks
* Delete tasks
* Manage task status
* Manage task priority

Task ownership is enforced so users cannot access or modify tasks belonging to other users.

Administrators have elevated permissions for protected administrative operations.

---

# Advanced Task Features

The Task API supports:

* Pagination
* Filtering
* Sorting
* Search
* Task ownership
* Status management
* Priority management

### Pagination

```http
GET /api/tasks?page=1&limit=10
```

### Filtering

```http
GET /api/tasks?status=completed
```

```http
GET /api/tasks?priority=high
```

### Sorting

```http
GET /api/tasks?sort=createdAt
```

### Search

Search is supported across task title and description:

```http
GET /api/tasks?search=typescript
```

Multiple query parameters can also be combined.

---

# Security & Authorization

The API implements multiple layers of security.

### Authentication

JWT Access Tokens are used to authenticate protected requests.

```http
Authorization: Bearer <access_token>
```

### Refresh Tokens

Refresh Tokens are:

* Stored in HttpOnly Cookies
* Hashed before database storage
* Associated with the user
* Stored with expiration information
* Revocable

### Resource Ownership

Users can only access their own tasks.

For example:

```text
User A
   ↓
Task A
   ↓
userId = User A
```

If User B attempts to access or delete Task A:

```text
User B
   ↓
Task A
   ↓
Ownership Check
   ↓
403 Forbidden
```

This behavior was verified in the deployed production environment.

---

# Backend Architecture

The application follows a layered architecture combined with the Repository and Service patterns.

```text
                 HTTP Request
                      │
                      ▼
                   Routes
                      │
                      ▼
                Middleware
                      │
              ┌───────┴───────┐
              │               │
        Authentication    Authorization
              │               │
              └───────┬───────┘
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
```

### Benefits

* Separation of concerns
* Maintainable codebase
* Testable business logic
* Easier debugging
* Reusable services
* Scalable project structure

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* HttpOnly Cookies
* Refresh Tokens
* Helmet
* express-rate-limit
* express-mongo-sanitize
* CORS

## Validation

* Joi

## Logging

* Morgan
* Winston

## Testing

* Jest
* Supertest
* MongoDB Memory Server
* ts-jest

## API Documentation

* Swagger OpenAPI
* swagger-jsdoc
* swagger-ui-express

## DevOps & Deployment

* Docker
* Docker Compose
* GitHub Actions
* Render
* MongoDB Atlas

---

# Project Structure

```text
task-management-system-TS/
│
└── server/
    │
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── interfaces/
    │   ├── middleware/
    │   ├── models/
    │   ├── repositories/
    │   ├── routes/
    │   ├── services/
    │   ├── validators/
    │   ├── tests/
    │   ├── app.ts
    │   └── server.ts
    │
    ├── Dockerfile
    ├── docker-compose.yml
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DaryaMarco/task-management-system-TS.git
```

## Navigate to Backend

```bash
cd task-management-system-TS/server
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the `server` directory.

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/task-management

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=15m

NODE_ENV=development
```

### Production

Production secrets should **never be committed to GitHub**.

For the deployed application, environment variables are configured through the hosting platform.

The production database uses **MongoDB Atlas** and the API is deployed on **Render**.

---

# Run Application

## Development

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

---

# Build

Compile TypeScript:

```bash
npm run build
```

This generates the compiled JavaScript files inside:

```text
dist/
```

---

# Production Start

```bash
npm start
```

The production server starts from:

```text
dist/server.js
```

---

# Swagger Documentation

Swagger UI is available locally at:

```text
http://localhost:5000/api-docs
```

Swagger provides:

* API endpoint documentation
* Request schemas
* Response examples
* Authentication documentation
* JWT testing support

---

# Docker

The project includes Docker and Docker Compose configuration for local containerized development.

## Docker Services

| Service | Container                 |    Port |
| ------- | ------------------------- | ------: |
| API     | `task-management-api`     |  `5000` |
| MongoDB | `task-management-mongodb` | `27017` |

## Start Containers

```bash
docker compose up --build
```

## Stop Containers

```bash
docker compose down
```

## Remove Containers and Volumes

```bash
docker compose down -v
```

MongoDB data is persisted through a Docker volume.

---

# Docker Architecture

```text
                Docker Compose
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   Node.js API              MongoDB
   Express + TS             MongoDB 7
          │                     │
          └──────────┬──────────┘
                     │
               Docker Network
```

---

# API Health Check

The root endpoint can be used to verify that the deployed API is running.

```http
GET /
```

Production:

```text
https://task-management-system-ts.onrender.com/
```

Expected response:

```text
Task-management API - TypeScript 🚀
```

---

# API Endpoints

## Authentication

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/register` | Register a new user             |
| POST   | `/api/auth/login`    | Login user                      |
| POST   | `/api/auth/refresh`  | Refresh access token            |
| POST   | `/api/auth/logout`   | Logout and revoke refresh token |

---

## Tasks

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | `/api/tasks`        | Create task                    |
| GET    | `/api/tasks`        | Get authenticated user's tasks |
| GET    | `/api/tasks/:id`    | Get task by ID                 |
| PATCH  | `/api/tasks/:id`    | Update task                    |
| DELETE | `/api/tasks/:id`    | Delete task                    |
| POST   | `/api/tasks/assign` | Assign task (Admin)            |

---

## Users

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/users`     | Get users (Admin)   |
| DELETE | `/api/users/:id` | Delete user (Admin) |

---

# Testing

The project uses:

* Jest
* Supertest
* MongoDB Memory Server
* ts-jest

Tests cover important authentication and task-management flows.

## Test Coverage Includes

### Authentication

* User registration
* Duplicate email handling
* Login
* Authentication
* Invalid authentication
* Protected routes

### Task Management

* Task creation
* Task retrieval
* Get single task
* Task update
* Task deletion
* Task ownership
* Invalid task data
* Filtering
* Search
* Pagination
* Non-existing tasks

## Run Tests

```bash
npm test
```

The test suite has been successfully executed locally.

---

# Production Verification

The deployed API was manually tested against the live Render environment.

## Authentication

```text
Register                    ✅
Login                       ✅
JWT Access Token            ✅
Refresh Token Cookie        ✅
HttpOnly Cookie             ✅
No Token                    ✅ Rejected
Invalid Token               ✅ Rejected
```

## Task API

```text
Create Task                 ✅
Get All Tasks               ✅
Get Single Task             ✅
Filter                      ✅
Search                      ✅
Pagination                  ✅
Update Task                 ✅
Delete Task                 ✅
Verify Deleted Task         ✅
```

## Authorization

Resource ownership was also verified in production:

```text
User 1 → Own Task            ✅
User 2 → User 1 Task        ❌ 403 Forbidden
User 2 → Delete User 1 Task ❌ 403 Forbidden
```

This confirms that authentication and authorization are both enforced in the deployed environment.

---

# Database

## Local Development

The application can use a local MongoDB instance:

```text
mongodb://localhost:27017/task-management
```

## Docker

When using Docker Compose:

```text
mongodb://mongodb:27017/task-management
```

## Production

Production uses **MongoDB Atlas**.

The production connection string is stored securely as an environment variable and is not committed to the repository.

---

# Database Indexing

The Task collection uses indexes to improve query performance.

Implemented indexes include:

```text
userId + status + priority
userId + createdAt
```

These indexes support common task queries such as:

* User-specific tasks
* Filtering by status
* Filtering by priority
* Sorting by creation date

---

# CI / Testing

The project includes automated testing through GitHub Actions.

The CI workflow validates the application by installing dependencies and running the test suite.

This helps ensure that changes do not break existing functionality before deployment.

---

# Deployment

The API is deployed to **Render**.

Production architecture:

```text
                    Internet
                       │
                       ▼
                  Render
                       │
                       ▼
              Node.js + Express
                       │
                       ▼
                 MongoDB Atlas
```

### Production URL

```text
https://task-management-system-ts.onrender.com
```

### Deployment Configuration

The Render service uses:

```text
Root Directory:
server
```

Build command:

```bash
yarn install --production=false && yarn build
```

Start command:

```bash
yarn start
```

The production build compiles TypeScript before starting the Node.js server.

---

# Security Practices

The project implements several backend security practices:

* Password hashing with bcryptjs
* JWT authentication
* Refresh Token hashing
* HttpOnly Cookies
* Protected routes
* Role-based authorization
* Resource ownership checks
* Joi request validation
* Helmet security headers
* Rate limiting
* MongoDB sanitization
* CORS configuration
* Centralized error handling
* Environment-based configuration
* Production secrets excluded from source control

---

# API Request Flow

A typical authenticated request follows this flow:

```text
Client
  │
  ▼
Express Route
  │
  ▼
Authentication Middleware
  │
  ▼
Authorization / Ownership Middleware
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
Mongoose Model
  │
  ▼
MongoDB Atlas
```

---

# Error Handling

The API uses centralized error handling for common API failures.

Examples include:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

Example:

```json
{
  "status": "fail",
  "message": "Task not found"
}
```

---

# Example Production Requests

### Register

```http
POST https://task-management-system-ts.onrender.com/api/auth/register
```

### Login

```http
POST https://task-management-system-ts.onrender.com/api/auth/login
```

### Get Tasks

```http
GET https://task-management-system-ts.onrender.com/api/tasks
```

### Create Task

```http
POST https://task-management-system-ts.onrender.com/api/tasks
```

### Search

```http
GET https://task-management-system-ts.onrender.com/api/tasks?search=Deploy
```

### Filter

```http
GET https://task-management-system-ts.onrender.com/api/tasks?status=pending
```

### Pagination

```http
GET https://task-management-system-ts.onrender.com/api/tasks?page=1&limit=10
```

---

# Future Improvements

Potential future improvements include:

* Redis caching
* WebSocket notifications
* Advanced monitoring
* Centralized log management
* Kubernetes deployment
* PostgreSQL migration with Prisma
* CI/CD pipeline improvements
* API performance monitoring
* Automated API integration testing in production-like environments

---

# Project Highlights

This project demonstrates practical experience with:

```text
TypeScript
Node.js
Express
MongoDB
Mongoose
JWT
Authentication
Authorization
Repository Pattern
Service Layer
REST API
Jest
Supertest
Swagger
Docker
Docker Compose
GitHub Actions
MongoDB Atlas
Render
```

The project was developed with a focus on **clean architecture, security, testability, maintainability, and production deployment**.

---

# Author

Developed by **Darya**

GitHub:

https://github.com/DaryaMarco/task-management-system-TS

Live API:

https://task-management-system-ts.onrender.com
