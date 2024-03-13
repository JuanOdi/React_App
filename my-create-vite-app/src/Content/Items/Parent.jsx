// ParentComponent.js
import React, { useState, useCallback, useEffect } from "react";
import { products } from "../../constants/products";
import Item2 from "./Item2";
import About from "../../Pages/About";

const ParentComponent = () => {
  const [cart, setCart] = useState(() => {
    const localdata = localStorage.getItem("cart");
    return localdata ? JSON.parse(localdata) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const removeToCart = useCallback((product) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== product.id);
    });
  }, []);

  return (
    <div>
      <Item2
        products={products}
        cart={cart}
        addToCart={addToCart}
        removeToCart={removeToCart}
      />
      <About items={cart} />
    </div>
  );
};

export default ParentComponent;
