require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRoutes = require("./routes/routes");

const server = express();
const User = require("./model/User");
User.sync({ force: false });

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(mainRoutes);

server.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
