const { Model, DataTypes } = require("sequelize");

class Task extends Model {
    static init(connection) {
        super.init({
            taskName: DataTypes.STRING,
            complete: DataTypes.BOOLEAN,
        },
        {
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' })
    }
}

module.exports = Task;