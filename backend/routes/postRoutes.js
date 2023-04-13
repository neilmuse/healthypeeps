const POST_MODEL = require("../schemas/post");

const { authMiddleware } = require("../middlewares/auth");

module.exports = {
    configure: (router) => {
        router.get("/posts", authMiddleware, async (req, res) => {
            const posts = await POST_MODEL.find();
            return res.json({ posts });
        });
    },
};
