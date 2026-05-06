const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }, // 'USER' , 'ADMIN'
});

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'todo' }, // 'todo', 'in-progress', 'done'
    dueDate: { type: DataTypes.DATE },
    reminderSent: { type: DataTypes.BOOLEAN, defaultValue: false }
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
    User,
    Task
};