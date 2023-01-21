const User = require("../model/User");
const validator = require("validator");
const Helpers = require("../helpers/Helpers");

const userController = {
  async findAll(req, res) {
    try {
      const users = await User.findAll({
        order: [["id", "DESC"]],
        attributes: { exclude: ["password"] },
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async findOne(req, res) {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ error: "Invalid data" });
    }
    try {
      const user = await User.findAll({
        where: { id: id },
        order: [["id", "DESC"]],
        attributes: { exclude: ["password"] },
      });
      if (user.length === 0) {
        return res.status(404).json({ error: "not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async create(req, res) {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "invalid email" });
    }
    try {
      const isDuplicateEmail = await User.findOne({ where: { email: email } });
      if (isDuplicateEmail) {
        return res.status(400).json({ error: "the email already exists" });
      }
      const userCreate = await User.create({
        email,
        password: Helpers.hashGenerator(password),
      });
      res.json({ msg: "successfully registered user" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = userController;
