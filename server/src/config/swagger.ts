import swaggerJsdoc from "swagger-jsdoc";

const options = {

    definition: {

        openapi: "3.0.0",

        info: {
            title: "Task Management API",
            version: "1.0.0",
            description:
                "Task Management API built with TypeScript, Express, MongoDB and JWT authentication",
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server",
            },
        ],

        tags: [
            {
                name: "Auth",
                description: "Authentication endpoints",
            },
            {
                name: "Tasks",
                description: "Task management endpoints",
            },
        ],

        components: {

            securitySchemes: {

                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },

            },

        },

    },

    apis: [
        "./src/routes/*.ts",
    ],

};


const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;