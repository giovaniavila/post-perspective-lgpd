const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.read)

router.get("/users/:id", usersController.readByID)

router.post("/users", usersController.create)

router.put("/users/:id", usersController.update)

router.delete("/users/:id", usersController.delete)

module.exports = router;