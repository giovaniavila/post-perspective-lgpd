const { Router } = require("express");
const router = Router();
const postsController = require("../controllers/postsController");

router.get("/posts", postsController.read)

router.get("/home/posts/:id", postsController.readById)

router.post("/posts", postsController.create)

router.put("/posts/:id", postsController.update)

router.delete("/posts/:id", postsController.delete)

module.exports = router;