const router = require("express").Router();
const { Blog } = require("../../models");



//create post
router.post("/", async (req, res) => {
    console.log("POST",req.body)
    try {
        const dbBlogDta = await Post.create({
            title: req.body.title,
            // description: req.body.content,
            content: req.body.content,
            author: req.body.author_id,
            // author_id: req.body.author,
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