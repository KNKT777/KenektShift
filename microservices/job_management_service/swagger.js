
        import swaggerJSDoc from 'swagger-jsdoc';
        import swaggerUi from 'swagger-ui-express';

        const options = {
          definition: {
            openapi: '3.0.0',
            info: {
              title: 'KenektShift API',
              version: '1.0.0',
            },
          },
          apis: ['./routes/*.js'],
        };

        const swaggerSpec = swaggerJSDoc(options);

        export default (app) => {
          app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        };
        