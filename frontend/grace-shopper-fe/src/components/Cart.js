import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCardListInCart from './ProductCardListInCart';
import {
  fetchCartByUserId
} from "../api/index";


const Cart = ( props ) => {

  const { user, forceRerender } = props;
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartReRender, setCartReRender] = useState(false);

  

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


 return <ProductCardListInCart user={user} products={cart} total={cartTotal} setCartReRender={setCartReRender} forceRerender={forceRerender}/>;
}

export default Cart;
