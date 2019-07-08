const Model = require('../models');
const Order = require('../models').Order;
const Op = require('sequelize').Op;
const ApiUtil = require('../util/ApiUtil');
const ModelFactory = require('../util/ModelFactory');
const Constants = require('../util/Constant');

class OrderController {
    /**
     * This method handles  search orders by filters supplied in the body
     * @param {object} req - The request object. This contains a property called 'body'
     * This body property is an object in the format { customerId: 'customerId', pizzaTypeId: 'pizzaTypeId', pizzaSizeId: 'pizzaSizeId', statusId: "statusId"}
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static search(req, res, next) {
        let { limit, page, pizzaTypeId, pizzaSizeId, customerName, statusId, startDate, endDate } = req.body;
        // build search params
        let payload = {};
        (statusId) ? payload.statusId = statusId : '';
        (customerName) ? payload.customerName = customerName : '';
        (pizzaSizeId) ? payload.pizzaSizeId = pizzaSizeId : '';
        (pizzaTypeId) ? payload.pizzaTypeId = pizzaTypeId : '';
        (startDate && endDate) ? payload.createdAt = { [Op.gt]: new Date(`${startDate} 00:00`), [Op.lt] : new Date(`${endDate} 23:59`)} : '';
        // Pagination
        let extraParams = {};
        if(limit){
            extraParams.limit = limit;
        }
        if(page && limit){
            extraParams.offset = limit * (page - 1);
        }

        Order.findAndCountAll({
            where: payload,
            order: [['id', 'DESC']],
            include: [
                {model: Model.PizzaType, as: 'pizzaType'},
                {model: Model.PizzaSize, as: 'pizzaSize'},
                {model:  Model.Status, as: 'status'},
            ],
            ...extraParams
        }).then(orders => {
            const { count, rows } = orders;
            const size = (limit) ? parseInt(limit) : count;
            const pageInfo = ApiUtil.pageSummary(page, count, size, limit);
            return res.json(ModelFactory.processResponse({ totalRecords: count, page : pageInfo, size, rows}))
        }).catch(err => {
            return res.status(400).json(ModelFactory.processError(err));
        });
    }
    /**
     * This method handles  users creating order
     * @param {object} req - The request object. This contains a property called 'body'.
     * This body property is an object in the format { customerId: 'customerId', 'quantity': 'quantity', pizzaTypeId: 'pizzaTypeId', pizzaSizeId: pizzaSizeId }
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */

    static create(req, res, next) {
        return Order
            .create({...req.body, statusId: 1})
            .then(order => res.status(201).json(ModelFactory.processResponse(order)))
            .catch(error => res.status(400).json(ModelFactory.processError(error)));
    }

    /**
     * This method handles updating order
     * @param {object} req - The request object. This contains a property called 'body'.
     * This body property is an object in the format { customerId: 'customerId', pizzaTypeId: 'pizzaTypeId', pizzaSizeId: pizzaSizeId }
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */

    static async update(req, res, next) {
        if (isNaN(req.params.id)) {
            const err_msg = 'Provide a valid id';
            return res.status(400).json(ModelFactory.processError(err_msg));
        } else {
            try {
                const order = await Order.findOne(
                    { where: {id: req.params.id },
                    include: [
                        {model:  Model.Status, as: 'status'},
                    ]
                });

                if(!order){
                    res.status(400).json(ModelFactory.processError("Order does not exist"))
                }else {
                    // Allow only pending order to be updated
                    if(order.status.name === Constants.PENDING_STATUS) {
                        const updatedOrder = await order.update(req.body);
                        return res.json(ModelFactory.processResponse(updatedOrder))
                    }else {
                        res.status(400).json(ModelFactory.processError("Order cannot be modified"));
                    }
                }
            } catch (e) {
                res.status(400).json(ModelFactory.processError(error));
            }
        }
    }

    static async getOrder(req, res, next) {
        if (isNaN(req.params.id)) {
            const err_msg = 'Provide a valid id';
            return res.status(400).json(ModelFactory.processError(err_msg));
        } else {
            // Prevent delivered order to be updated
            try {
                const order = await Order.findOne(
                    { where: {id: req.params.id },
                    include: [
                        {model:  Model.Status, as: 'status'},
                    ]
                });

                if(!order){
                    res.status(400).json(ModelFactory.processError("Order does not exist"))
                }else{
                    return res.json(ModelFactory.processResponse(order))
                }

            } catch (e) {
                res.status(400).json(ModelFactory.processError(error));
            }
        }
    }

    static async remove(req, res, next) {
        if (isNaN(req.params.id)) {
            const err_msg = 'Provide a valid id';
            return res.status(400).json(ModelFactory.processError(err_msg));
        } else {
            // Prevent delivered order to be deleted
            try {
                const order = await Order.findOne(
                    { where: {id: req.params.id },
                    include: [
                        { model:  Model.Status, as: 'status'},
                    ]
                });

                if(!order){
                    res.status(400).json(ModelFactory.processError("Order does not exist"))
                }else{
                    if(order.status.name === Constants.PENDING_STATUS) {
                        await order.destroy();
                        return res.json(ModelFactory.processResponse("Order removed"))
                    }else {
                        res.status(400).json(ModelFactory.processError("Order cannot be removed"));
                    }
                }
            } catch (e) {
                res.status(400).json(ModelFactory.processError(e));
            }
        }
    }

}

module.exports = OrderController;
