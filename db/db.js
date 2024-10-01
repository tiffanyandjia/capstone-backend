import { Sequelize } from "sequelize";
import UserModel from "./User.js";
import GoalModel from "./Goal.js";
import MessageModel from "./Message.js";
import FriendsModel from "./Friends.js";
//process.env.DATABASE_URL
/*
1.process.env.DATABASE_URL === postgres://postg
*/
//

let db;
if (process.env.DATABASE_URL === undefined) {
    console.log("Connected locally!");
    db = new Sequelize("postgres://localhost:5432/capstone", {
        logging: false,
    });
} else {
    db = new Sequelize(process.env.DATABASE_URL, {
        logging: false,
    });
}

// const db = new Sequelize("postgres://localhost:5432/capstone", {
//     logging: false, // disable logging; default: console.log
// });
const User = UserModel(db);
const Goal = GoalModel(db);
const Message = MessageModel(db);
const Friend = FriendsModel(db);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");
        await db.sync({ alter: true }); //alter: true

        Friend.belongsTo(User, { foreignKey: "user2" });
        Message.belongsTo(User, { foreignKey: "sentByUserID", as: "sender" });
        Message.belongsTo(User, { foreignKey: "sentToUserID", as: "receiver" });
    } catch (error) {
        console.error(error);
        console.error("Unable to connect to the database:");
    }
};

await connectToDB();

export { db, User, Goal, Message, Friend };
