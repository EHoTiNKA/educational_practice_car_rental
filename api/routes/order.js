import express from "express"
import { Order } from "../../database/index.js"

const router = express.Router();

// все orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении заказов" });
    }
});

// order по id
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: "Заказ не найден" });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при поиске заказа" });
    }
});


export default router;