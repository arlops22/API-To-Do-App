const Sequelize = require("sequelize");
const dbConfig = require('../config/database');

const Task = require('../models/Task');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

User.init(connection);
Task.init(connection);

Task.associate(connection.models)

module.exports = connection;