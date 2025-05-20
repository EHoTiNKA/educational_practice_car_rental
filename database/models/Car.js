// модель автомобиля

import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Car = sequelize.define("Car", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Car;