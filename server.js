import express from "express";
import sequelize from "./database/config.js";
import carRoutes from "./api/carRoutes.js";
import cors from "cors";

const app = express();
const PORT = 3001;


app.use(cors());

app.use(express.json());
app.use("/api/cars", carRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("База данных подключена");
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к БД:", err);
  });