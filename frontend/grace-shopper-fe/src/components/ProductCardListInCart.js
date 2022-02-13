import { Container } from "@mui/material";
import React, { useState } from "react";
import AddToCart from "./AddToCart";
import ProductCardInCart from "./ProductCardInCart";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const ProductCardListInCart = (props) => {

  const { user, products, total, setCartReRender, forceRerender } = props;

  const [openAddToCart, setOpenAddToCart] = useState(false);
  const [productToAddToCart, setProductToAddToCart] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  console.log("PRODUCTS IN CART: ", products)

  async function handleToken(token){
    // console.log({token, addresses})
    const response = await axios.post('https:localhost:4000/checkout', {
      token, total 
    });

    const { status } = response.data;
    if(status === 'success'){
      console.log('success');
    }
  }

  return ( <>
      {/* <form action="/create-checkout-session" method="POST">

<button type="submit">

  Checkout

</button>

</form> */}

<StripeCheckout 
  stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
  token={handleToken}
  billingAddress
  shippingAddress
  total={total * 100}
/>
  <Container style={{
      display: "flex",
      gap: 15,
  }}>
  <Card sx={{ maxWidth: 1000 }}>
  <CardContent>
              TOTAL: ${total}
          </CardContent>
  </Card>
  </Container>


    <Container style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 15,
    }}>
                  
      {
        products ? products.map(product => {
          console.log('product element during map', product)
          return <ProductCardInCart
            user={user}
            product={product}
            key={product.id}
            setOpenAddToCart={setOpenAddToCart}
            setProductToAddToCart={setProductToAddToCart}
            setAnchorEl={setAnchorEl}
            setCartReRender={setCartReRender}
            forceRerender={forceRerender}
          />
        }) : null
      }


    </Container>
    </>

  );
};

export default ProductCardListInCart;
