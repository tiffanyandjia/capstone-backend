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
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        interests: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        curious: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            defaultValue: "user",
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        imageType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};

export default UserModel;
