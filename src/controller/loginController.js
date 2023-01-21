const jwt = require("jsonwebtoken");
const Helpers = require("../helpers/Helpers");
const User = require("../model/User");

const loginController = {
  async auth(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ error: "email not found" });
      }
      const passwordIsCorrect = Helpers.checkPassword(password, user.password);
      if (!passwordIsCorrect) {
        return res.status(401).json({ error: "incorrect password" });
      }
      return res.json({ msg: "Acesso autorizado" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = loginController;
