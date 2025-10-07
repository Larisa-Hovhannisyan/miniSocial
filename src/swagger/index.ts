import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const options = {
    definition : {
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'swagger docs',
            description: 'description'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ["./src/routes/*.ts"]
  }

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(options)))

  console.log("Swagger UI available at: http://localhost:3000/api-docs");
}
