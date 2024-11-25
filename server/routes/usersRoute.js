const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");
const { sendUserDataEmail } = require("../controllers/usersController");

router.get("/users", usersController.read);

router.get("/users/:id", usersController.readById);

router.post("/users", usersController.create);

router.post("/sendEmail", async (req, res) => {
    const { toEmail, userDataFile } = req.body;
  
    try {
      await sendUserDataEmail({
        toEmail,
        userDataFile,
      });
      res.status(200).send("E-mail enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).send(error.message);
    }
  });

router.put("/users/:id", usersController.update);

// endpoint to update 'terms_accepted' in users after terms and conditions being updated
router.put("/users-terms/:id", usersController.updateTermsAccepted);

router.delete("/users/:id", usersController.delete);

module.exports = router;
