const termsAndCoditionsModel = require('../models/termsAndConditionsModel');

class termsAndCoditionsController {

    async create (req, res) {
        try {
            const newTerms = req.body;

            const terms = await termsAndCoditionsModel.createTerms(newTerms); 
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

    update(req, res) {
    const updatedTerms = req.body;
    const { id } = req.params;
    const termsUpdate = termsAndCoditionsModel.updateTerms(updatedTerms, id);

    termsUpdate
        .then((terms) => res.status(200).json(terms))
        .catch((error) => res.status(400).json(error.message));
    }

}

module.exports = new termsAndCoditionsController();