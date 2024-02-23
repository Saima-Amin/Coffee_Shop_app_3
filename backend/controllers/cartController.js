const Cart = require('../models/Cart');
const Product = require('../models/Products');


module.exports = {
    addToCart: async (req, res) => {
        const {userId, cartItem, quantity} = req.body;

        try {
           const cart = await Cart.findOne({userId}) 


           if(cart){
            const existingProduct = cart.products.find(
                (product) => product.cartItem.toString() === cartItem
            );
            if(existingProduct){
                existingProduct.quantity += 1
            }else{
                cart.products.push({cartItem, quantity})
            }

            await cart.save();
            res.status(200).json("Product added to cart")
           }else{
            const newCart = new Cart({
                userId,
                products: [{
                    cartItem, quantity: quantity
                }]

            });
            await newCart.save();
            res.status(200).json("Product added to cart")
            
           }

        } catch (error) {
            res.status(500).json(error)
        }
    },

    getCart: async (req, res) => {
        const userId = req.params.id;

        try {
           const cart = await Cart.find({ userId }) 
               .populate('products.cartItem', "id title supplier price imageUrl");

            res.status(200).json(cart)
   
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deletCartItem: async (req, res) => {
        const {userId, cartItem} = req.body;

        try {
            
        } catch (error) {
            
        }

    },

    decrementCartItem: async (req, res) => {
        const {userId, cartItem} = req.body;

        try {
           const cart = Cart.findOne({userId}) 

           if(!cart){
            return res.status(404).json("Cart not found")
           }

           const existingProduct = cart.products.find(
             (product) => product.cartItem.toString() === cartItem
           );


           if(!existingProduct){
            return res.status(404).json("product not found")
           }

           if(existingProduct.quantity === 1){
            cart.products = cart.products.filter(
                (product) => product.cartItem.toString() !== cartItem
            )
           }else{
            
           }

        } catch (error) {
            
        }
    },
}