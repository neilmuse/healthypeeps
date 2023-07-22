const controllers = require("../controllers/controllers");
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
    app.post("/api/signup", controllers.signup);
	app.post("/api/login", controllers.login);
	app.post("/api/refresh_token", authMiddleware, controllers.refreshToken);
	app.post("/api/check_email", authMiddleware, controllers.checkEmailInDatabase);

	app.get("/api/get_user_by_id/:userId", controllers.getUserById);
	app.get('/api/get_user_data', authMiddleware, controllers.getUserData);

	app.patch('/api/update_user/:id', authMiddleware, controllers.updateUserData);


	//POST ROUTES
	app.get('/api/get_all_posts_by_category', controllers.getAllPostsByCategory);
	app.get('/api/get_all_posts_by_category_limited', controllers.getAllPostsByCategoryLimited);
	app.get('/api/posts/:category/:id', controllers.getSpecificPost);
	app.get('/api/posts/:id', controllers.getSpecificPostById);
	app.post('/api/add_post', authMiddleware, controllers.addPost);
	app.post('/api/upload', upload.single('image'), controllers.uploadImage);
	app.put('/api/posts/:id', authMiddleware, controllers.editPost);
	app.delete('/api/posts/:id', authMiddleware, controllers.deletePost);
	app.get('/api/posts', controllers.getAllPostsTitleByCategory);

	//COMMENTS
	app.post('/api/add_comment', authMiddleware, controllers.addComment);
	app.get('/api/comments/:id', controllers.getCommentsByPostId);
	app.put('/api/comments/:id', authMiddleware, controllers.editComment);
	app.delete('/api/comments/:id', authMiddleware, controllers.deleteComment);
}