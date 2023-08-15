const swaggerJsDoc = require('swagger-jsdoc');
const config = require('config');
const pkg = require('../../../package.json');

module.exports = () => {
    const options = {
        apis: ['./src/modules/**/routes.js'],
        definition: {
            openapi: '3.0.0',
            servers: [{
                url: config.baseUrl,
            }],
            info: {
                title: 'GottaSaveThemAll',
                version: pkg.version,
                description: 'GottaSaveThemAll documentation',
            },
            components: {
            },
            security: [],
        },
    };
    return swaggerJsDoc(options);
};