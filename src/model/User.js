const Sequelize = require("sequelize");
const Datatypes = Sequelize.DataTypes;
const connection = require("../config/mysql/connection");

const User = connection.define(
  "User",
  {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
