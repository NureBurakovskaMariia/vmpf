const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Некоректний email або пароль" });
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return res.status(400).json({ message: "Користувач з таким email вже існує" });
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const token = generateJwt(user.id, user.email, user.role);

        return res.json({ token });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Вказано неправильний пароль" });
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();