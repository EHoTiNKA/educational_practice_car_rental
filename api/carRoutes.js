import express from "express"
import { Car } from "../database/index.js"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: "Ощибка при получении автомобилей" });
    }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: "Автомобиль не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при поиске автомобиля" });
  }
});

export default router;