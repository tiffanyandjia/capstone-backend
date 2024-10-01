import { DataTypes } from "sequelize";

const MessageModel = (db) => {
    return db.define("message", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: DataTypes.TEXT,
        outgoing: DataTypes.BOOLEAN,
        timestamp: DataTypes.DATE,
        // sentByUserID: DataTypes.INTEGER,
        // sentToUserID: DataTypes.INTEGER,
        sentByUserID: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: User, // Establish relationship with User model
            //     key: "id",
            // },
        },

        sentToUserID: {
            type: DataTypes.INTEGER,
            // references: {
            //     model: User, // Establish relationship with User model
            //     key: "id",
            // },
        },
    });
};

export default MessageModel;
