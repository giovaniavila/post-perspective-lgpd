const postsModel = require('../models/postsModel');

class postsController {

    async create (req, res) {
        try {
            const newPost = req.body;

            const post = await postsModel.createPost(newPost); 
            res.status(201).json(post); 
        } catch (error) {
            res.status(400).json({ error: error.message }); 
        }
    }
    

    read (req, res) {
        const answer = postsModel.readPosts();

        answer.then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json(error.message));
    }

    update (req, res) {
        const updatedPost = req.body;
        const { id } = req.params; 

        const postUpdate = postsModel.updatePost(updatedPost, id);

        postUpdate.then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json(error.message));
    }

    delete(req, res) {
        const { id } = req.params;
        const answer = postsModel.deletePost(id);

        answer.then((answerDelete) => res.status(200).json(answerDelete))
        .catch((error) => res.status(400).json(error.message));
    }
}

module.exports = new postsController();