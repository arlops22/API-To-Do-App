const Task = require('../models/Task');
const User = require('../models/User');

module.exports = {

    async create(req, res) {

        const { taskName } = req.body;
        const userId = req.userId;

        try {
            
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            const task = await Task.create({ 
                taskName,
                userId
            });
    
            return res.json(task);
        
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async index(req, res) {

        const userId = req.userId;

        try {
            const user = await User.findByPk(userId, {
                include: { association: 'tasks' }
            })

            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            return res.status(200).json(user.tasks)

        } catch(error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {

        const { taskId } = req.params;
        const { taskName } = req.body;
        const userId = req.userId;

        try {

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            const task = await Task.findByPk(taskId);

            if (task.userId != userId) {
                return res.status(404).json({error: "User is not the owner!"});
            }

            if (!task) {
                return res.status(404).json({error: "Task not found!"})
            }

            task.taskName = taskName;

            task.save();

            return res.status(200).json(task)

        } catch(error) {
            return res.status(500).json(error)
        }
    },

    async delete(req, res) {
        
        const { taskId } = req.params;
        const userId = req.userId;

        try {

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            const task = await Task.findByPk(taskId);

            if (task.userId != userId) {
                return res.status(404).json({error: "User is not the owner!"});
            }

            if (!task) {
                return res.status(404).json({error: "Task not found!"})
            }

            task.destroy();

            return res.json({message: "Task successfull deleted!"});

        } catch(error) {
            return res.status(500).json(error);
        }
    },

    async finishTask(req, res) {

        const { taskId } = req.params;
        const { complete } = req.body;
        const userId = req.userId;

        try {

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(401).json({error: "User not found"});
            }

            const task = await Task.findByPk(taskId);

            if (task.userId != userId) {
                return res.status(404).json({error: "User is not the owner!"});
            }

            if (!task) {
                return res.status(404).json({error: "Task not found!"});
            }

            task.complete = complete;

            task.save();

            return res.status(200).json(task)

        } catch(error) {
            return res.status(500).json(error);
        }

    }
}