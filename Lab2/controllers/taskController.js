const { Task } = require('../models');

class TaskController {
    async create(req, res) {
        try {
            const { title, description, dueDate } = req.body;
            const task = await Task.create({ title, description, dueDate, userId: req.user.id });
            return res.json(task);
        } catch (e) {
            return res.status(500).json({ message: "Помилка створення", error: e.message });
        }
    }

    async getAll(req, res) {
        const tasks = await Task.findAll();
        return res.json(tasks);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id } });
        return res.json(task);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Задачу не знайдено" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        await task.save();
        return res.json(task);
    }

    async delete(req, res) {
        const { id } = req.params;
        await Task.destroy({ where: { id } });
        return res.json({ message: "Задачу видалено" });
    }
}

module.exports = new TaskController();