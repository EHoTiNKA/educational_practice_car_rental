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



export default router;