const usersModel = require('../models/usersModel');

class usersController {

    async create (req, res) {
        try {
            const newUser = req.body;
            const user = await usersModel.createUser(newUser); 
            res.status(201).json(user); 
        } catch (error) {
            res.status(400).json({ error: error.message }); 
        }
    }
    

    read (req, res) {
        const answer = usersModel.readUser();

        answer.then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json(error.message));
    }

    readByID (req, res) {
        const { id } = req.params; 
        const answer = usersModel.readUserByID(id);
        
        answer.then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json(error.message));
    }

    update (req, res) {
        const updatedUsers = req.body;
        const { id } = req.params; 
        const usersUpdate = usersModel.updateUser(updatedUsers, id);

        usersUpdate.then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json(error.message));
    }

    delete(req, res) {
        const { id } = req.params;
        const answer = usersModel.deleteUser(id);

        answer.then((answerDelete) => res.status(200).json(answerDelete))
        .catch((error) => res.status(400).json(error.message));
    }
}

module.exports = new usersController();