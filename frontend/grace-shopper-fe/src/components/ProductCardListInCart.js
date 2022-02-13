import { Container } from "@mui/material";
import React, { useState } from "react";
import AddToCart from "./AddToCart";
import ProductCardInCart from "./ProductCardInCart";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

const ProductCardListInCart = (props) => {

  const { user, products, total } = props;

  const [openAddToCart, setOpenAddToCart] = useState(false);
  const [productToAddToCart, setProductToAddToCart] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  console.log("PRODUCTS IN CART: ", products)

  return ( <>
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
          />
        }) : null
      }


    </Container>
    </>

  );
};

export default ProductCardListInCart;
