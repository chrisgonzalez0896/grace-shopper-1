import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCardListInCart from './ProductCardListInCart';
import {
  fetchCartByUserId
} from "../api/index";


const Cart = ( props ) => {

  const { user } = props;
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  

  useEffect(() => {
    Promise.all([
      fetchCartByUserId(user.id),
       //need to make a a getAllProductPictures function in api/index and integrate throughout backend
    ]).then(([cartFromAPI]) => {
      setCart(cartFromAPI.cart);
      setCartTotal(cartFromAPI.total);
      console.log('carttotal in cart.js', cartFromAPI.total)
      console.log('cart from API: ', cartFromAPI.cart)
    });
  }, [setCart]);

 

  console.log(
    'cart in cart.js: ', cart
  )
//   const { user } = props;

//   console.log("userId in cart.js: ", user.id)

//   let userCart = [];
//   const [returnValue, setReturnValue] = useState(<></>);

//   function annoying(stuff){
//     console.log("stuff: ", stuff);
//     userCart = stuff;
//     let renderStuff = (<Container>
//    <ProductCardListInCart user={user} products={userCart} />
//  </Container>)

//     setReturnValue(renderStuff);
//   }

//     // setUserCart(fetchCartByUserId(user.id));

//     const getUserCart = async( currentUser ) => {
//       const cart = await fetchCartByUserId(currentUser.id);
//       return cart;
//     }

//     const thisUsersCart = getUserCart(user);

//     thisUsersCart.then(function(result) {
//       // userCart = result.cart;
//       annoying(result.cart);
//       console.log('result: ', result.cart)
//       return result.cart;
//       // "Some User token"
//    })



//     console.log('look here', userCart)
// console.log("userCart in cart: ", userCart)

 return <ProductCardListInCart user={user} products={cart} total={cartTotal} />;
}

export default Cart;
