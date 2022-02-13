import { Container } from "@mui/material";
import React, { useState } from "react";
import AddToCart from "./AddToCart";
import ProductCard from "./productCard";

const ProductCardList = (props) => {

  const { user, products } = props;

  const [openAddToCart, setOpenAddToCart] = useState(false);
  const [productToAddToCart, setProductToAddToCart] = useState();
  const [anchorEl, setAnchorEl] = useState();


  return (

    <Container style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 15,
    }}>
      {
        products ? products.map(product => {
          return <ProductCard
            user={user}
            product={product}
            key={product.id}
            setOpenAddToCart={setOpenAddToCart}
            setProductToAddToCart={setProductToAddToCart}
            setAnchorEl={setAnchorEl}
          />
        }) : null
      }

      <AddToCart
      user={user}
        product={productToAddToCart}
        open={openAddToCart}
        setOpen={setOpenAddToCart}
        anchorEl={anchorEl}
      />

    </Container>

  );
};

export default ProductCardList;
