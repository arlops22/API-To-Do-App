const Sequelize = require("sequelize");
const dbConfig = require('../config/database');

const Task = require('../models/Task');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Task.init(connection);
User.init(connection);

module.exports = connection;