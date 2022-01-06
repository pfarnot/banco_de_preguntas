export default {
    port: process.env.PORT || 3001,
    SECRET_TOKEN: "cespoBP",
    db_POSTGRES: {
        host: '127.0.0.1',
        port: 5433,
        user: 'postgres',
        password: 'postgres',
        database: 'banco_preguntas',
        pool: false
    },
    version:'/api/v1'
}