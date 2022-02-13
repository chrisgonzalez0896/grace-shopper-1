const express = require("express");
const cartRouter = express.Router();
const requireUser = require("./middleware/requireUser");
const { getCartByUserId,
    addToCart,
    removeFromCart,
    clearCart } = require('../db/cart');


// Need to ensure userId gets passed to here!
cartRouter.get('/:userId', async(req, res) => {

    const userId = req.params.userId;

    try{
        const cart = await getCartByUserId( userId );
        
        res.send(  cart  );

        console.log('cart in route: ', cart)
   
    } catch(error){
        throw error;
    }
    
});


cartRouter.post('/', async(req, res) => {
    const { userId, productId } = req.body;
    try{
        await addToCart(req.body);
        const cart = await CartByUserId( userId );
        res.send( { cart } );
    } catch(error){
        console.error(error);
        next( { name: "Product Post Error", message: "An error was encountered while adding this product to the cart." } )
    }
});

//here we need to see both the userId and a specific productId is specified
cartRouter.delete('/:userId/:productId',requireUser,async(req,res,next) => {

    const userId = req.params.userId;
    const productId = req.params.productId;
    try{
        // if( productId ){
        //     await removeFromCart( req.body );
        // } else{
        //     await clearCart( userId );
        // }
        console.log('in api ids: ', userId, productId)
           const item = await removeFromCart( {userId, productId} );
console.log('in api, deleted item: ', item)
        res.send({item});
    } catch(error){
        throw error;
    }
})
 

module.exports = cartRouter;