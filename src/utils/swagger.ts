import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";
import { PORT } from "@/utils/config.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Project API",
      version: "1.0.0",
      description: "API documentation for my project",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1/`,
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
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
