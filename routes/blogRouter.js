const  blogRouter = require("express").Router();
const multer = require("multer");
const path = require("node:path");
const { renderAddBlog, createNewBlog, getBlogDetails, commnetsHandler } = require("../controllers/blogController");

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

blogRouter.get("/addNew", renderAddBlog);
blogRouter.post("/addNew", upload.single("coverImageUrl"), createNewBlog);
blogRouter.get("/:id",getBlogDetails);
blogRouter.post("/comment/:blogId", commnetsHandler);

module.exports = blogRouter;
