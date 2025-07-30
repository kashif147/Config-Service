// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the version of Swagger
    info: {
      title: 'API Documentation', // Title of the API
      version: '1.0.0', // Version of the API
      description: 'API Documentation for my Node.js/Express app', // Description
    },
    servers: [
      {
        url: 'https://node-api-app-dxecgpajapacc4gs.northeurope-01.azurewebsites.net', // Your server URL
      },
    ],
  },
  apis: ['./routes/*.js','./routes/api/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
