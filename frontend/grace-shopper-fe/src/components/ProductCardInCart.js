import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Box from '@mui/material/Box';
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { currencyFormat } from "../helpers/formats";
import { useNavigate } from "react-router-dom";
import AddToCart from './AddToCart';

const ProductCard = (props) => {
  const { user,
    product,
    setOpenAddToCart,
    setProductToAddToCart,
    setAnchorEl,
setTotal,
total } = props;


    const navigate = useNavigate();  
    const { expand, ...other } = props.product;  
    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));  

  const [expanded, setExpanded] = useState(false);  
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };  

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setProductToAddToCart(product);
    setOpenAddToCart(true);
  }  
  
  return (
    <Card sx={{ maxWidth: 345, display:"flex", flexDirection:"column"}}>
      <CardHeader
        action={currencyFormat(product.price)}
        title={product.name}
        subheader=""
      />

    <Box sx={{display:"flex", flexDirection:"column", alignSelf:"flex-end"
}}>
        <Button>
        REMOVE FROM CART
    </Button>

    </Box>


    </Card>
  );
};
export default ProductCard;