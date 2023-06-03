const router = require("express").Router();
const { Blog } = require("../../models");



//create post
router.post("/", async (req, res) => {
    try {
        const dbBlogDta = await Post.create({
            creator: req.body.creator_name,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            author_id: req.body.author_id,
        });
        return res.status(200).json(dbBlogDta);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//update post
router.put("/:id", async (req, res) => {
    try {
        const updateBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(updateBlog);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
        const deleteBlog = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.status(200).json(deleteBlog);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;