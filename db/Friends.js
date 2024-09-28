import { DataTypes } from "sequelize";

const FriendsModel = (db) => {
    return db.define("friend", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user1: DataTypes.INTEGER,
        user2: DataTypes.INTEGER,
    });
};

export default FriendsModel;
