const { Router } = require("express");
const router = Router();
const termsAndConditionsController = require("../controllers/termsAndConditionsController");

router.get("/terms", termsAndConditionsController.read)

router.post("/terms", termsAndConditionsController.create)

// router.put("/terms/:id", termsAndConditionsController.update)


module.exports = router;