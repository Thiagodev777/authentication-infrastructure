const User = require("../model/User");

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
};

module.exports = userController;
