const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(connection) {
        super.init({
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' })
    }
}

module.exports = User;