const Status = require('../models').Status;
const ModelFactory = require('../util/ModelFactory');

class StatusController {
    /**
     * This method handles  users retrieving status
     * @param {object} req - The request object.
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static list(req, res, next) {
        return Status
            .findAll({})
            .then(statuses => res.json(ModelFactory.processResponse(statuses)))
            .catch(error => res.status(400).json(ModelFactory.processError(error)));
    }
}

module.exports = StatusController;
