const termsAndCoditionsModel = require("../models/termsAndConditionsModel");
const usersModel = require("../models/usersModel");
const usersController = require("../controllers/usersController");

async function notifyUsers() {
  try {
    const userEmails = await usersModel.getAllUserEmails();

    const subject = "Atualização dos Termos e Condições";
    const text = `
            Caro usuário,
    
            Gostaríamos de informá-lo que nossos Termos e Condições foram atualizados. 
            Pedimos que leia atentamente as novas condições no nosso site, pois ao continuar utilizando nossos serviços, você concorda com os novos termos.
    
            Para mais informações, consulte os Termos e Condições atualizados em nosso site.
    
            Atenciosamente,
            Equipe de Suporte
        `;

    for (const email of userEmails) {
      try {
        await usersController.userSendNotification({
          subject: subject,
          toEmail: email,
          notificationText: text,
        });
        console.log(`Notificação enviada para ${email}`);
      } catch (error) {
        console.error(`Erro ao enviar notificação para ${email}:`, error);
      }
    }
  } catch (error) {
    console.error("Erro ao obter os e-mails dos usuários:", error);
  }
}

class termsAndCoditionsController {
  async create(req, res) {
    try {
      const newTerms = req.body;

      const terms = await termsAndCoditionsModel.createTerms(newTerms);
      await notifyUsers();
      res.status(201).json(terms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  read(req, res) {
    const answer = termsAndCoditionsModel.readTerms();

    answer
      .then((terms) => res.status(200).json(terms))
      .catch((error) => res.status(400).json(error.message));
  }

  async update(req, res) {
    try {
      const updatedTerms = req.body;
      const { id } = req.params;

      const termsUpdate = await termsAndCoditionsModel.updateTerms(
        updatedTerms,
        id
      );
      res.status(200).json(termsUpdate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new termsAndCoditionsController();
