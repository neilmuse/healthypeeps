const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const saltedPassword = await bcrypt.hash(password, salt);
  
    return saltedPassword;
};

const comparePassword = async (plainPassword, saltedPassword) => {
    return await bcrypt.compare(plainPassword, saltedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};