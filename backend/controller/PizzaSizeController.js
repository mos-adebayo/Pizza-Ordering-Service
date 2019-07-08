const PizzaSize = require('../models').PizzaSize;
const ModelFactory = require('../util/ModelFactory');

class PizzaSizeController {
    /**
     * This method handles  users retrieving pizza sizes
     * @param {object} req - The request object.
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static list(req, res, next) {
        return PizzaSize
            .findAll({})
            .then(sizes => res.json(ModelFactory.processResponse(sizes)))
            .catch(error => res.status(400).json(ModelFactory.processError(error)));
    }

    /**
     * This method handles creating pizza size
     * @param {object} req - The request object. This contains a property called 'body'.
     * This body property is an object in the format { name: 'name''}
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static create(req, res, next) {
        return PizzaSize
            .create(req.body)
            .then(pizzaSize => res.status(201).json(ModelFactory.processResponse(pizzaSize)))
            .catch(error => res.status(400).json(ModelFactory.processError(error)));
    }
}

module.exports = PizzaSizeController;
