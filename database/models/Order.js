import sequelize from "../config.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


export default Order;