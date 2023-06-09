const userController = require("../controllers/userController");
const authMiddleware = require('../middlewares/auth-middleware');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (app) => {
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
		next();
	})

	//USER ROUTES
    app.post("/api/signup", userController.signup);
	app.post("/api/login", userController.login);
	app.post("/api/refresh_token", authMiddleware, userController.refreshToken);

	app.get("/api/get_user_by_id", userController.getUserById);
	app.get('/api/get_user_data', authMiddleware, userController.getUserData);

	app.patch('/api/update_user/:id', authMiddleware, userController.updateUserData);


	//POST ROUTES
	app.get('/api/get_all_posts_by_category', userController.getAllPostsByCategory);
	app.get('/api/get_all_posts_by_category_limited', userController.getAllPostsByCategoryLimited);
	app.get('/api/posts/:category/:id', userController.getSpecificPost);
	app.get('/api/get_discussion/:id', userController.getSpecificDiscussion);
	app.post('/api/add_post', authMiddleware, userController.addPost);
	app.post('/api/upload', upload.single('image'), userController.uploadImage);
}