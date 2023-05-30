const bcrypt = require("bcryptjs");

const USER_MODEL = require("../schemas/user");

const { hashPassword, comparePassword } = require('../utilities/password-util');
const { validateFields } = require('../utilities/validation');

module.exports = {
  signup: async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword, phoneNumber, userType } = req.body;
  
    const validationError = validateFields(firstName, lastName, email, password, repeatPassword, phoneNumber);
  
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    try {
      const existingUser = await USER_MODEL.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new USER_MODEL({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        userType,
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
