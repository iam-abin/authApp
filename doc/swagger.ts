import yamljs from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const swaggerDocument = yamljs.load(path.join(__dirname, './swagger.yaml'));

export const swatterUIServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerDocument)
