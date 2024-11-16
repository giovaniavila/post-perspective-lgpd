const commentsModel = require('../models/commentsModel');

class commentsController {

    async create (req, res) {
        try {
            const newComment = req.body;

            const comment = await commentsModel.createComment(newComment); 
            res.status(201).json(comment); 
        } catch (error) {
            res.status(400).json({ error: error.message }); 
        }
    }
    

    read (req, res) {
        const answer = commentsModel.readComments();

        answer.then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json(error.message));
    }

    readByID (req, res) {
        const { id } = req.params; 
        const answer = commentsModel.readCommentsByPostID(id);
        

        answer.then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json(error.message));
    }

    update (req, res) {
        const updatedComment = req.body;
        const { id } = req.params; 

        const commentUpdate = commentsModel.updateComment(updatedComment, id);

        commentUpdate.then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json(error.message));
    }

    delete(req, res) {
        const { id } = req.params;
        const answer = commentsModel.deleteComment(id);

        answer.then((answerDelete) => res.status(200).json(answerDelete))
        .catch((error) => res.status(400).json(error.message));
    }
}

module.exports = new commentsController();