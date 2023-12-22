const BlogModel = require("../models/blogModel");
const CommentModel = require("../models/commentModel");
const renderAddBlog = (req, res) => {
  return res.render("addBlog", { user: req.user });
};

const createNewBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    await BlogModel.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageUrl: `uploads/${req.file.filename}`,
    });
  } catch (error) {
    return res.redirect("/", { error });
  }
  return res.redirect("/");
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id).populate("createdBy");
    const comments = await CommentModel.find({
      blogId: req.params.id,
    }).populate("createdBy");
    return res.render("blog", {
      blog: blog,
      user: req.user,
      comments: comments,
    });
  } catch (error) {
    return res.render("/");
  }
};
const commnetsHandler = async (req, res) => {
  try {
    const comment = await CommentModel.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
  } catch (error) {
    return res.redirect("/");
  }

  return res.redirect(`/blog/${req.params.blogId}`);
};

module.exports = {
  renderAddBlog,
  createNewBlog,
  getBlogDetails,
  commnetsHandler,
};
