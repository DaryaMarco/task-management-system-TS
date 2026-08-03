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
