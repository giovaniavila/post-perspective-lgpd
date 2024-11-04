const { Router } = require("express");
const router = Router();
const commentsController = require("../controllers/commentsController");

router.get("/comments", commentsController.read)

router.post("/comments", commentsController.create)

router.put("/comments/:id", commentsController.update)

router.delete("/comments/:id", commentsController.delete)

module.exports = router;