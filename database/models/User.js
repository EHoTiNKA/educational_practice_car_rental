import sequelize from "../config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    driver_license_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


export default User;