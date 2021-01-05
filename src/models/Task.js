const { Model, DataTypes } = require("sequelize");

class Task extends Model {
    static init(connection) {
        super.init({
            taskName: DataTypes.STRING,
            complete: DataTypes.BOOLEAN
        },
        {
            sequelize: connection
        })
    }
}

module.exports = Task;