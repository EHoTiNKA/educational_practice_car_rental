import express from 'express';
import usersRouter from './routes/user.js';
import carsRoutes from "./routes/car.js";
import ordersRoutes from "./routes/order.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/cars", carsRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(PORT, () => console.log(`Сервер запущен по порту - http://localhost:${PORT}/api/`));