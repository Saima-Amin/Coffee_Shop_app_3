const router = require('express').Router();
const cartController = require('../controllers/cartController');


router.get('/find/:id',cartController.getCart)
router.post('/',cartController.addToCart)
router.delete('/:cartItemId',cartController.deletCartItem)
router.post('/quantity',cartController.decrementCartItem)



module.exports = router;