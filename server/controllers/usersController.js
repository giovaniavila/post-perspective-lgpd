const usersModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    try {
      const user = await usersModel.findUserByEmail(email);

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email }, // Dados que você quer no token
        process.env.JWT_SECRET, // Segredo para assinar o token (certifique-se de definir isso no seu .env)
        { expiresIn: "1h" } // Tempo de expiração do token
      );

      return res.status(200).json({
        message: "Login bem-sucedido",
        user: { id: user.id, username: user.username, email: user.email }, // Dados do usuário
        token: token, // Token JWT gerado
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      res.status(500).json({ error: "Erro interno ao realizar login" });
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
        res.status(404).json({ error: "Usuário não encontrado" });
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
      .then((answerDelete) => res.status(200).json(answerDelete))
      .catch((error) => res.status(400).json(error.message));
  }
}

module.exports = new usersController();
