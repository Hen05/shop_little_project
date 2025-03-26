const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Autenticação',
            version: '1.0.0',
            description: 'Documentação da API de autenticação com cookies para gerenciamento de sessões',
        },
        components: {
            securitySchemes: {
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;
