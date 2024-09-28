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
        sentByUserID: DataTypes.INTEGER,
        sentToUserID: DataTypes.INTEGER,
    });
};

export default MessageModel;
