const { Router } = require("express");
const multer = require("multer");
const path = require("node:path");
const BlogModel = require("../models/blogModel");
const CommentModel = require("../models/commentModel");
const blogRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

blogRouter.get("/addNew", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

blogRouter.post("/", upload.single("coverImageUrl"), (req, res) => {
  const { title, body } = req.body;
  BlogModel.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `uploads/${req.file.filename}`,
  });
  return res.redirect("/");
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await BlogModel.findById(req.params.id).populate("createdBy");
  const comments = await CommentModel.find({blogId:req.params.id}).populate("createdBy");
  return res.render("blog", {
    blog: blog,
    user: req.user,
    comments:comments
  });
});

blogRouter.post("/comment/:blogId", async (req, res) => {
  const comment = CommentModel.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = blogRouter;
