import Order from "./Order.js";
import User from "./User.js";
import Car from "./Car.js";

Order.hasOne(User, { foreignKey: "user_id" });
User.belongsTo(Order, { foreignKey: "user_id" });

Order.hasOne(Car, { foreignKey: "car_id" });
Car.belongsTo(Order, { foreignKey: "car_id" });