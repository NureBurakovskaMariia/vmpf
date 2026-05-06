const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Task, User } = require('../models');
const { Op } = require('sequelize');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const startCronJobs = () => {
    console.log("Планувальник задач запущено...");


    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

            const tasks = await Task.findAll({
                where: {
                    dueDate: {
                        [Op.lte]: tomorrow,
                        [Op.gt]: now
                    },
                    status: {
                        [Op.ne]: 'done'
                    },
                    reminderSent: false
                },
                include: [User]
            });

            for (let task of tasks) {
                if (task.user && task.user.email) {
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: task.user.email,
                        subject: `Нагадування: Дедлайн задачі "${task.title}" наближається!`,
                        text: `Привіт! Нагадуємо, що задачу "${task.title}" потрібно виконати до ${task.dueDate.toLocaleDateString()}. \n\nОпис: ${task.description || 'Немає'}`
                    };

                    await transporter.sendMail(mailOptions);
                    console.log(`Лист відправлено користувачу: ${task.user.email}`);

                    task.reminderSent = true;
                    await task.save();
                }
            }
        } catch (error) {
            console.error("Помилка планувальника:", error);
        }
    });
};

module.exports = startCronJobs;