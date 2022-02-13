const client = require("./client")
const { getProductsById } = require("./products")


async function getCartByUserId( userId ){
    console.log("Getting cart by userId: ", userId);
    try{

        const array = []; 
        const returnObj = {};

        const { rows: cart } = await client.query(`
            SELECT *
            FROM cart
            WHERE "userId"=$1;
        `, [ userId ]);

        console.log('cart in db: ', cart )
        let total = 0;
        for(let i = 0; i < cart.length; i++){
            let currentProduct = await getProductsById(cart[i].productId);
            array.push(currentProduct);
            total += currentProduct.price;
        }

        console.log('array in db: ', array)

        returnObj.cart = array;
        returnObj.total = total;

        console.log('returnObj in db: ', returnObj);

        return returnObj;
    } catch(error){
        throw error;
    }
}


async function addToCart( { userId, productId } ) {
    console.log("Adding product to cart!");
    try{
        const { rows: [ product ] } = await client.query(`
            INSERT INTO cart("userId","productId")
            VALUES($1, $2)
            RETURNING *;
        `, [ userId, productId ]);
        return product;
    } catch(error){
        throw error;
    }
}



async function removeFromCart( { userId, productId } ){
    console.log("Removing product from cart!");
    try{
        const { rows: [ product ] } = await client.query(`
            DELETE FROM cart
            WHERE "productId"=$1
            AND "userId"=$2
        `, [ productId, userId ]);
        return product;
    } catch(error){
        throw error;
    }
}


//NOTE: whenever a cart is purchased, it must be cleared, and its contents added to an order log along with the address
async function clearCart( {userId } ){
    console.log("Clearing cart!");
    try{
        const {rows: products } = await client.query(`
            DELETE FROM cart
            WHERE "userId"=$1
        `[ userId ]);
        return products;
    } catch(error){
        throw error;
    }
}


module.exports = {
    getCartByUserId,
    addToCart,
    removeFromCart,
    clearCart
}

