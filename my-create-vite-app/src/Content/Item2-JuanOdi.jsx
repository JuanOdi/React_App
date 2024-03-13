import React, { useCallback, useState } from "react";
import Cart from "./Cart";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { products } from "../constants/products";
import item3 from "../assets/item/item3.jpg";
const Item2 = () => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);
  return (
    <div>
      <Cart items={cart} />
      <ProductList addToCart={addToCart} />
    </div>
  );
};

const ProductList = ({ addToCart }) => {
  {
    products;
  }

  const handleAddtoCart = (product) => {
    addToCart(product);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        paddingTop: "20px",
        justifyContent: "center",
      }}
    >
      {products.map((product, index) => (
        <Card key={index} style={{ width: "18rem" }} className="">
          <Card.Img variant="top" src={product.img} className="h-50" />

          <Card.Body>
            <Card.Title className="font-bold text-xl">
              {product.name}
            </Card.Title>
            <Card.Text>{product.price}</Card.Text>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => handleAddtoCart(product)}
              className="text-black mt-2 ml-10"
            >
              {" "}
              +{" "}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Item2;
