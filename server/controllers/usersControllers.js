const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
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
    const { email } = req.body;
    try {
      const user = await usersModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, "seu_segredo", {
        expiresIn: "1h",
      });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login" });
    }
  }

  read(req, res) {
    const answer = usersModel.readUser();
    answer
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json(error.message));
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
