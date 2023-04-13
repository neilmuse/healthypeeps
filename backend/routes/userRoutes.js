const userController = require("../controllers/userController");

module.exports = (app) => {
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
		next();
	})

    app.post("/api/signup", userController.signup);
}

// module.exports = {
//     configure: (router) => {
//         router.get("/currentUser", authMiddleware, async (req, res) => {
//             const user = await USER_MODEL.findOne({ _id: req.userId });
//             return res.json({ user });
//         });

//         router.get("/users", authMiddleware, async (req, res) => {
//             const users = await USER_MODEL.find();
//             return res.json({ users });
//         });

//         router.post("/signup", async (req, res) => {
//             const { firstName, lastName, email, password, phoneNumber, userType } = req.body;

//             try {
//                 const existingUser = await USER_MODEL.findOne({ email });

//                 if (existingUser) {
//                     return res.status(400).json({ message: "User already exists" });
//                 }

//                 const hashedPassword = await hashPassword(password);

//                 const newUser = new USER_MODEL({
//                     firstName,
//                     lastName,
//                     email,
//                     password: hashedPassword,
//                     phoneNumber,
//                     userType,
//                 });

//                 console.log(newUser);

//                 await newUser.save();

//                 res.status(201).json({ message: "User created successfully", user: newUser });
//             } catch (error) {
//                 res.status(500).json({ message: "Something went wrong" });
//                 console.log(error);
//             }
//         });
//     }
// };
