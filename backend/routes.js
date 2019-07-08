const { Router } = require('express');
const StatusController = require('./controller/StatusController');
const PizzaTypeController = require('./controller/PizzaTypeController');
const PizzaSizeController = require('./controller/PizzaSizeController');
const OrderController = require('./controller/OrderController');

const router = Router();

//Landing page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Pizza Ordering Service' });
});

/** Status Routes */
router.get('/status', StatusController.list);

/** Pizza Routes */
router.get('/pizza-types', PizzaTypeController.list);
router.get('/pizza-sizes', PizzaSizeController.list);

// Orders
router.post('/order', OrderController.create);
router.post('/orders/search', OrderController.search);
router.get('/orders/:id', OrderController.getOrder);
router.put('/orders/:id', OrderController.update);
router.delete('/orders/:id', OrderController.remove);

module.exports = { router };