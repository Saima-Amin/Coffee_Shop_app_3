const router = require('express').Router();
const ordersController = require('../controllers/orderController');

router.get('/:id',ordersController.getUserOrders);

module.exports = router;