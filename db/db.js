import { Sequelize } from "sequelize";
import UserModel from "./User.js";
import GoalModel from "./Goal.js";

const db = new Sequelize("postgres://localhost:5432/capstone", {
    logging: false, // disable logging; default: console.log
});
const User = UserModel(db);
const Goal = GoalModel(db);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
        db.sync({ alter: true }); //
    } catch (error) {
        console.error(error);
        console.error("Unable to connect to the database:");
    }
};

connectToDB();

export { db, User, Goal };
