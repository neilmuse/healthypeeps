const bcrypt = require("bcryptjs");

const USER_MODEL = require("../schemas/user");

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, userType } = req.body;

  // Check for missing fields
  if (!firstName || !lastName || !email || !password || !phoneNumber || !userType) {
    return res.status(400).json({ message: 'Missing required field(s)' });
  }

  // Check for empty string fields
  if (firstName === '' || lastName === '' || email === '' || password === '' || phoneNumber === '' || userType === '') {
    return res.status(400).json({ message: 'Empty string(s) found' });
  }

  try {
    const existingUser = await USER_MODEL.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new USER_MODEL({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      userType,
    });
    
    console.log(newUser.firstName)
    console.log(newUser.lastName)
    console.log(newUser.password)
    console.log(newUser.phoneNumber)
    console.log(newUser.userType)

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
