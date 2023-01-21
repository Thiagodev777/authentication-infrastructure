const bcrypt = require("bcrypt");

const Helpers = {
  hashGenerator(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  checkPassword(password, userPassword) {
    const correct = bcrypt.compareSync(password, userPassword);
    return correct;
  },
};

module.exports = Helpers;
