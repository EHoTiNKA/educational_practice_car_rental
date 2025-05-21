import express from "express"
import { Car } from "../../database/index.js"

const router = express.Router();

// все cars
router.get("/", async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении пользователей" });
    }
});

// car по id
router.get("/:id", async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ error: "Пользователь не найден" });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при поиске пользователя" });
    }
});


export default router;