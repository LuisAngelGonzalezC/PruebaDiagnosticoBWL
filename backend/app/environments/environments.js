module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bwl-prueba',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    secret: '857d-4a71-a4da-32cecae3a'
}