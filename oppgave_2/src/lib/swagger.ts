import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api', // define api folder under app folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Oppgave 2 Swagger API Documentation',
        version: '1.0',
      },
      
      security: [],
    },
  });
  return spec;
};