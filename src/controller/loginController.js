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
        return res.status(404).json({ error: "email not found" });
      }
      const passwordIsCorrect = Helpers.checkPassword(password, user.password);
      if (!passwordIsCorrect) {
        return res.status(401).json({ error: "incorrect password" });
      }
      jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        },
        (err, token) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          }
          return res.json({ token: token });
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = loginController;
