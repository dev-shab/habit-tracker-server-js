import path from "path";
import swaggerUi from "swagger-ui-express";
import SwaggerParser from "@apidevtools/swagger-parser";
import { type Express } from "express";

export async function setupSwagger(app: Express) {
  try {
    const swaggerDocument = await SwaggerParser.bundle(
      path.resolve(process.cwd(), "src/swagger/index.yaml")
    );

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.error("Error setting up Swagger UI by parsing files");
  }
}
