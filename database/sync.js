// создание таблиц в базе

import sequelize from "./config.js";
import { Car } from "./index.js"

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Соединение установленно");

        await sequelize.sync({ force: true });
        console.log("Таблицы созданы");

        await Car.create({
            name: "BMW",
            desc: "Описание автомобиля BMW...",
            type: "Седан",
            price: 5000,
            img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg",
        });
        await Car.create({
            name: "Tesla Module X",
            desc: "Описание автомобиля Tesla...",
            type: "Седан",
            price: 15000,
            img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg",
        });
        await Car.create({
            name: "RAM TRX",
            desc: "Описание автомобиля RAM...",
            type: "Пикап",
            price: 50000,
            img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg",
        });
        console.log("Автомобиль добавлен.");
    } catch (error) {
        console.error("Ошибка подключения:", error);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();