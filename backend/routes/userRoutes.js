const userController = require("../controllers/userController");
const authMiddleware = require('../middlewares/auth-middleware');

module.exports = (app) => {
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
		next();
	})

    app.post("/api/signup", userController.signup);
	app.post("/api/login", userController.login);
	app.post("/api/refresh_token", userController.refreshToken);
	app.get('/api/get_user_data', authMiddleware, userController.getUserData);
}