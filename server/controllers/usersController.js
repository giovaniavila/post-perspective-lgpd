const usersModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createEventBackup } = require("../backup/eventBackup");
const nodemailer = require("nodemailer");

class usersController {
  async create(req, res) {
    try {
      const newUser = req.body;
      const user = await usersModel.createUser(newUser);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    try {
      const user = await usersModel.findUserByEmail(email);
      console.log("User found:", user);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Wrong password" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email }, // Dados que você quer no token
        process.env.JWT_SECRET, // Segredo para assinar o token (certifique-se de definir isso no seu .env)
        { expiresIn: "1h" } // Tempo de expiração do token
      );

      return res.status(200).json({
        message: "Successful Login",
        user: { id: user.id, username: user.username, email: user.email }, // Dados do usuário
        token: token, // Token JWT gerado
      });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ error: "Internal error on login" });
    }
  }

  read(req, res) {
    const answer = usersModel.readUser();

    answer
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json(error.message));
  }

  async readById(req, res) {
    const { id } = req.params;

    try {
      const user = await usersModel.readUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  update(req, res) {
    const updatedUsers = req.body;
    const { id } = req.params;
    const usersUpdate = usersModel.updateUser(updatedUsers, id);

    usersUpdate
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json(error.message));
  }

  delete(req, res) {
    const { id } = req.params;
    const answer = usersModel.deleteUser(id);

    answer
      .then((answerDelete) => res.status(200).json(answerDelete), createEventBackup(`User with ID ${id} deleted`))
      .catch((error) => res.status(400).json(error.message));
  }

   sendUserDataEmail = async ({ toEmail, subject, text, userDataFile }) => {
    if (!toEmail || !subject || !text || !userDataFile) {
      throw new Error("Missing required fields: toEmail, subject, text, or userDataFile.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "gmail",
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.PASSWORD_USER, 
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: toEmail, 
      subject: subject, 
      text: text, 
      attachments: [
        {
          filename: 'user_data.txt', 
          content: userDataFile,    
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("E-mail enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw error;
    }
  };

}

module.exports = new usersController();
