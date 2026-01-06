import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./component/Navbar";
import ProductList from "./component/ProductList";
import ProductCard from "./component/ProductCard";
import AddCart from "./component/AddCart";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={ProductCard} />
          <Route path="/product-details" Component={ProductList} />
          <Route path="/cart" Component={AddCart} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
