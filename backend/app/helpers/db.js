const env = require('../environments/environments');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    env.db.database,
    env.db.user,
    env.db.password,
    {
        host: env.db.host,
        dialect: env.db.dialect
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model')(sequelize, Sequelize);

module.exports = db;
