const express = require("express");
const TasksController = require('./controllers/TasksController');
const UsersController = require('./controllers/UsersController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post("/register", UsersController.register);
routes.post("/authenticate", UsersController.authenticate);

routes.use(authMiddleware);

routes.get("/tasks", TasksController.index);
routes.post("/tasks", TasksController.create);
routes.post("/tasks/:taskId", TasksController.update);
routes.post("/tasks/:taskId/done", TasksController.finishTask);
routes.delete("/tasks/:taskId", TasksController.delete);

module.exports = routes;