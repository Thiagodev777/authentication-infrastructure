const bcrypt = require("bcrypt");

const Helpers = {
  hashGenerator(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },
};

module.exports = Helpers;
