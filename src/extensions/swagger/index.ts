import swaggerJsDoc from 'swagger-jsdoc';
import config from 'config';

const baseUrl = config.get('baseUrl');

export default () => {
    const options = {
        apis: ['./src/modules/**/routes.ts'],
        definition: {
            openapi: '3.0.0',
            servers: [{
                url: baseUrl,
            }],
            info: {
                title: 'GottaSaveThemAll',
                version: '1.0.0',
                description: 'GottaSaveThemAll documentation',
            },
            components: {
            },
            security: [],
        },
    };
    return swaggerJsDoc(options);
};