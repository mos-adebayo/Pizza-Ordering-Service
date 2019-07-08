const PizzaType = require('../models').PizzaType;
const ModelFactory = require('../util/ModelFactory');

class PizzaTypeController {
    /**
     * This method handles  users retrieving pizza types
     * @param {object} req - The request object.
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static list(req, res, next) {
        return PizzaType
            .findAll({})
            .then(pizzaTypes => res.json(ModelFactory.processResponse(pizzaTypes)))
            .catch(error => res.status(400).json(ModelFactory.processError(error)));
    }

    /**
     * This method handles creating pizza type
     * @param {object} req - The request object. This contains a property called 'body'.
     * @param {object} res - The response object
     * This body property is an object in the format { name: 'name''}
     * @param {function} next - The next middleware to be called, if any
     */
    static create(req, res, next) {
        return PizzaType
            .create(req.body)
            .then(pizzaType => res.status(201).json(ModelFactory.processResponse(pizzaType)))
            .catch(error => res.status(400).json(ModelFactory.processError(error)));
    }
}

module.exports = PizzaTypeController;
