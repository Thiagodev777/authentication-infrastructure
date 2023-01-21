require("dotenv").config();
const express = require("express");
const mainRoutes = require("./routes/routes");
const connection = require("./config/mysql/connection");

const User = require("./model/User");
User.sync({ force: false });

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(mainRoutes);

server.listen(process.env.PORT, () => console.log("ok"));
