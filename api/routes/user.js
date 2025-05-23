import express from "express"
import { User } from "../../database/index.js"

const router = express.Router();

// все users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении пользователей" });
    }
});

// user по id
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "Пользователь не найден" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при поиске пользователя" });
    }
});

// user register
router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                error: "Все поля обязательны для заполнения"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Некорректный формат email"
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: "Пользователь с таким email уже существует"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        res.status(500).json({
            error: "Произошла ошибка при регистрации"
        });
    }
});


// user login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email и пароль обязательны"
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                error: "Пользователь не найден"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                error: "Неверный пароль"
            });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Ошибка входа:", error);
        res.status(500).json({
            error: "Произошла ошибка при входе"
        });
    }
});

export default router;