const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.read);

router.get("/users/:id", usersController.readById);

router.post("/users", usersController.create);

router.post("/sendEmail", async (req, res) => {
  const { toEmail, subject, text, userDataFile } = req.body;

  try {
    await usersController.sendUserDataEmail({
      toEmail,
      subject,
      text,
      userDataFile,
    });
    res.status(200).send("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).send(error.message);
  }
});

router.put("/users/:id", usersController.update);

router.delete("/users/:id", usersController.delete);

module.exports = router;
