import sequelize from "./config.js";
import { User, Car, Order } from "./index.js"

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Соединение установленно");

        await sequelize.sync({ force: true });
        console.log("Таблицы созданы");

        
        await User.bulkCreate([
            { name: "User1", password: "qwerty1231", email: "exemple1@gmail.com", driver_license_type: "A" },
            { name: "User2", password: "qwerty1232", email: "exemple2@gmail.com", driver_license_type: "A" },
            { name: "User3", password: "qwerty1233", email: "exemple3@gmail.com", driver_license_type: "B" },
            { name: "User4", password: "qwerty1234", email: "exemple4@gmail.com", driver_license_type: "C" },
            { name: "User5", password: "qwerty1235", email: "exemple5@gmail.com", driver_license_type: "C" },
        ]);

        await Car.bulkCreate([
            {name: "Car1", desc: "description1", type: "Пикап", price: 15000, required_drive_license: "B", img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg"},
            {name: "Car2", desc: "description2", type: "Седан", price: 5000, required_drive_license: "A", img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg"},
            {name: "Car3", desc: "description3", type: "Пикап", price: 45000, required_drive_license: "B", img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg"},
            {name: "Car4", desc: "description4", type: "Купе", price: 8000, required_drive_license: "C", img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg"},
            {name: "Car5", desc: "description5", type: "Пикап", price: 25000, required_drive_license: "B", img: "https://static.insales-cdn.com/images/collections/1/2557/93579773/23259603.jpg"},
        ]);

        await Order.bulkCreate([
            {user_id: 1, car_id: 1, price: 15000, adress: "TestAdress1"},
            {user_id: 2, car_id: 2, price: 5000, adress: "TestAdress2"},
            {user_id: 3, car_id: 3, price: 45000, adress: "TestAdress3"},
            {user_id: 4, car_id: 4, price: 8000, adress: "TestAdress4"},
            {user_id: 5, car_id: 5, price: 25000, adress: "TestAdress5"},
            {user_id: 1, car_id: 2, price: 5000, adress: "TestAdress1"},
            {user_id: 1, car_id: 4, price: 8000, adress: "TestAdress1"},
            {user_id: 1, car_id: 1, price: 15000, adress: "TestAdress1"},
            {user_id: 2, car_id: 3, price: 45000, adress: "TestAdress2"},
            {user_id: 1, car_id: 1, price: 15000, adress: "TestAdress1"},
        ]);


    } catch (error) {
        console.error("Ошибка подключения:", error);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();