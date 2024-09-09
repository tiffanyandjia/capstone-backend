import { DataTypes } from "sequelize";

const UserModel = (db) => {
    return db.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intestes: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
        curious: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            defaultValue: "user",
        },
    });
};

export default UserModel;
