import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./components/Home"
import Featured from "./components/Featured"
import ProductWall from './components/ProductWall'
import Orders from './components/Orders';
import NavBar from './components/NavBar';
import MyAccount from './components/Myaccount'
import Login from "./components/Login";
import Register from "./components/Register";
import { loadTokenFromLocalStorage } from './helpers/tokenHelpers';
import OrderDetail from './components/OrderDetail';
import { fetchAllProducts } from "./api/index";


function App() {
  
  // Load login from cookie
  let userData = loadTokenFromLocalStorage();

  const [user, setUser] = useState(userData);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [generalViewOn, setGeneralViewOn] = useState(true);
  const [productBeingViewed, setProductBeingViewed] = useState({});


  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('token');
  };

  useEffect(() => {
    Promise.all( 
      [
        fetchAllProducts() //need to make a a getAllProductPictures function in api/index and integrate throughout backend
      ]
    )
    .then(([productsFromAPI]) => {
      setProductsArray(productsFromAPI);
      // console.log(routinesFromAPI)
    })
  }, [])


  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} products={products}/> 
      <Routes>
        <Route path='/' element={<><Home userData={user}/> <Featured productsArray={productsArray} generalViewOn={generalViewOn} setGeneralViewOn={setGeneralViewOn} productBeingViewed={productBeingViewed} setProductBeingViewed={setProductBeingViewed}/></>}/>
        <Route path='/login' element={<Login  setUser={setUser}/>} />
        <Route path='/register' element={<Register  setUser={setUser} user={user}/>} /> 
        <Route path='/products' element={<ProductWall user={user} productsArray={productsArray} setProducts={setProductsArray} generalViewOn={generalViewOn} setGeneralViewOn={setGeneralViewOn} productBeingViewed={productBeingViewed} setProductBeingViewed={setProductBeingViewed} />} />
        <Route path='/orders/:id' element={<OrderDetail />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/myaccount' element={<MyAccount products={products} user={user} />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
