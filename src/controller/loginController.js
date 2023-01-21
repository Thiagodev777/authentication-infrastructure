const loginController = {
  async auth(req, res) {
    const { email, password } = req.body;
    if (email && password) {
    } else {
      res.status(400).json({ error: "Invalid data" });
    }
  },
};

module.exports = loginController;
